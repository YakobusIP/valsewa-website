# Backend Structured Logging

The backend emits structured JSON logs to stdout/stderr via [Pino](https://getpino.io/). On the VPS, systemd journald captures those streams. [Grafana Alloy](https://grafana.com/docs/alloy/latest/) ships journald logs to Loki for querying in Grafana.

```
Backend app
  -> JSON logs to stdout/stderr
  -> systemd journald
  -> Grafana Alloy
  -> Loki
  -> Grafana
```

The application does **not** write log files or push directly to Loki.

## Runtime requirements

The backend requires **Node.js 20 or newer** (`engines.node` in `backend/package.json`).

Staging and production must use the **same system Node binary** as systemd `ExecStart` (`/usr/bin/node`). Deploy validates `/usr/bin/node` before `npm ci --production`; do not rely on nvm or a different PATH-only Node for deploy while systemd runs an older `/usr/bin/node`.

Install Node 20+ system-wide (for example via [NodeSource](https://github.com/nodesource/distributions)) so `/usr/bin/node` is v20+:

```bash
/usr/bin/node -v   # must be v20.x or higher
```

GitHub Actions builds use Node 20 via `actions/setup-node`.

## Request ID vs correlation ID

**`requestId`**

- Unique per HTTP request.
- Generated from `x-request-id` header or a new UUID.
- Use to debug one specific request/response.

**`correlationId`**

- Stable across a chain of related work.
- Taken from `x-correlation-id`, else `x-request-id`, else the new `requestId`.
- Cron jobs generate a correlation ID per run and pass it to scheduler API calls via `x-correlation-id`.
- Use to debug a booking flow, payment callback chain, cron-triggered sync, or retry chain across multiple requests.

Example log shape:

```json
{
  "level": "info",
  "event": "http_request_completed",
  "requestId": "a1b2c3d4-...",
  "correlationId": "f9e8d7c6-...",
  "method": "POST",
  "route": "/api/bookings",
  "statusCode": 200,
  "durationMs": 142
}
```

Response headers echo both IDs:

```txt
x-request-id: <requestId>
x-correlation-id: <correlationId>
```

## Request correlation

HTTP requests run inside an `AsyncLocalStorage` context. `requestId` and `correlationId` propagate to:

- `req.log` on controllers
- Service logs via `getContextLogger()` (account, booking, rank, Prisma slow queries, etc.)

Auth middleware patches `customerId`, `adminUsername`, and `isScheduler` into the same context.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | `info` | `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `silent` |
| `LOG_PRETTY` | `false` | Pretty-print in development when `true` |
| `SLOW_REQUEST_THRESHOLD_MS` | `1000` | HTTP requests slower than this log at `warn` |
| `SLOW_DB_QUERY_THRESHOLD_MS` | `300` | Prisma queries slower than this log as `slow_db_query` |
| `SLOW_EXTERNAL_REQUEST_THRESHOLD_MS` | `1000` | External API calls slower than this log at `warn` |
| `LOG_HASH_SECRET` | `development-log-hash-secret` | HMAC key for identifier hashes in logs |

Recommended values:

**development**

```txt
LOG_LEVEL=debug
LOG_PRETTY=true
```

**staging** (GitHub environment vars)

```txt
LOG_LEVEL=debug
LOG_PRETTY=false
SLOW_REQUEST_THRESHOLD_MS=1000
SLOW_DB_QUERY_THRESHOLD_MS=300
SLOW_EXTERNAL_REQUEST_THRESHOLD_MS=1000
LOG_HASH_SECRET=<strong secret in GitHub secrets>
```

**production** (GitHub environment vars)

```txt
LOG_LEVEL=info
LOG_PRETTY=false
SLOW_REQUEST_THRESHOLD_MS=1000
SLOW_DB_QUERY_THRESHOLD_MS=300
SLOW_EXTERNAL_REQUEST_THRESHOLD_MS=1000
LOG_HASH_SECRET=<strong secret in GitHub secrets>
```

Deploy writes these into the VPS `.env` via `_deploy-backend.yml`. Configure `LOG_HASH_SECRET` in GitHub environment secrets before deploying staging/production.

## Sensitive identifier logging

Payment and customer identifiers are never logged in raw form. Use:

- `virtualAccountNoLast4` — last four characters only
- `customerNoHash` / `referenceNoHash` — HMAC-SHA256 truncated to 12 hex chars (keyed by `LOG_HASH_SECRET`)
- `hasVirtualAccountNo`, `hasReferenceNo`, `hasSignature` — boolean presence flags

## Systemd service units

Reference units live in:

- `backend/infrastructure/systemd/backend-production.service`
- `backend/infrastructure/systemd/backend-staging.service`

Both use `ExecStart=/usr/bin/node dist/server.js`. Deploy checks that same path before install.

Install on the VPS (example for production):

```bash
sudo cp backend/infrastructure/systemd/backend-production.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable backend-production.service
sudo systemctl restart backend-production.service
```

Verify JSON logs in journald:

```bash
journalctl -u backend-production.service -n 100 --no-pager
journalctl -u backend-staging.service -n 100 --no-pager
```

## Grafana Alloy

Use [Grafana Alloy](https://grafana.com/docs/alloy/latest/) to read journald and forward to Loki. Filter to backend systemd units only and set `env` labels to match the LogQL examples below.

```alloy
loki.source.journal "backend_production" {
  forward_to = [loki.write.default.receiver]
  labels     = { app = "valsewa-backend", env = "production" }
  matches    = "_SYSTEMD_UNIT=backend-production.service"
}

loki.source.journal "backend_staging" {
  forward_to = [loki.write.default.receiver]
  labels     = { app = "valsewa-backend", env = "staging" }
  matches    = "_SYSTEMD_UNIT=backend-staging.service"
}

loki.write "default" {
  endpoint {
    url = "http://loki:3100/loki/api/v1/push"
  }
}
```

When one VPS hosts both environments, `env` comes from the Alloy source labels above.

## Loki label guidance

**Safe labels** (low cardinality):

- `app="valsewa-backend"`
- `env="production"` / `env="staging"`
- `level`
- `systemd_unit`
- Optionally extracted: `event`, `method`, `route`, `statusCode`

**Do not use as labels** (high cardinality — keep as JSON fields):

- `requestId`, `correlationId`, `customerId`, `bookingId`, `paymentId`, `accountId`
- `ip`, `userAgent`, raw `path`, query strings, `errorMessage`
- Payment identifiers (`customerNo`, full `virtualAccountNo`) — use HMAC hashes or last4 only

## Grafana / LogQL query examples

### Slowest average routes (10m window)

```logql
topk(10,
  avg_over_time(
    {app="valsewa-backend", env="production"}
    | json
    | event="http_request_completed"
    | unwrap durationMs [10m]
  ) by (route, method)
)
```

### p95 route latency

```logql
quantile_over_time(0.95,
  {app="valsewa-backend", env="production"}
  | json
  | event="http_request_completed"
  | unwrap durationMs [5m]
) by (route, method)
```

### 5xx errors by route

```logql
sum by (route, method, statusCode) (
  count_over_time(
    {app="valsewa-backend", env="production"}
    | json
    | event="http_request_completed"
    | statusCode >= 500 [5m]
  )
)
```

### Slow HTTP requests

```logql
{app="valsewa-backend", env="production"}
| json
| event="http_request_completed"
| durationMs > 1000
```

### Slow DB queries

```logql
{app="valsewa-backend", env="production"}
| json
| event="slow_db_query"
```

### External provider failures

```logql
{app="valsewa-backend", env="production"}
| json
| event="external_request_failed"
```

### Trace one request end-to-end

Includes HTTP, service-level, and Prisma slow-query logs for a single HTTP request:

```logql
{app="valsewa-backend", env="production"}
| json
| requestId="<paste-request-id>"
```

### Trace a correlated flow end-to-end

Includes cron runs, scheduler API calls, payment callbacks, and related service logs across multiple requests:

```logql
{app="valsewa-backend", env="production"}
| json
| correlationId="<paste-correlation-id>"
```

### Cron job failures

```logql
{app="valsewa-backend", env="production"}
| json
| event="cron_job_failed"
```

### Payment webhook activity

```logql
{app="valsewa-backend", env="production"}
| json
| event=~"faspay_.*"
```

## Local development

```bash
cd backend
LOG_LEVEL=debug LOG_PRETTY=true npm run dev
```

Each HTTP response should emit `http_request_completed` with `requestId`, `correlationId`, `method`, `route`, `statusCode`, and `durationMs`.

Middleware order logs CORS preflight and body-parser failures: request ID and HTTP logger run before CORS and body parsers.
