# Cron Timers (systemd) – How to Add & Maintain

This repo uses **systemd templated timers** to run backend “cron” HTTP calls.
Each cron is a **timer instance** (`backend-cron@<job>.timer`) that triggers a **service instance** (`backend-cron@<job>.service`), which calls a **single shared script** on the machine to send an HTTP request.

## Overview

### What’s committed vs not committed

**Committed (in git)**

- `backend-cron@.service` (template)
- `backend-cron@.timer` (template)
- Per-job overrides:

  - `backend-cron@<job>.service.d/override.conf` (endpoint / request target)
  - `backend-cron@<job>.timer.d/override.conf` (schedule)

## File Layout

### In this repo

```
infrastructure/cron/
  backend-cron@.service
  backend-cron@.timer
  backend-cron@check-password-expiration.service.d/override.conf
  backend-cron@check-password-expiration.timer.d/override.conf
  backend-cron@sync-completed.service.d/override.conf
  backend-cron@sync-completed.timer.d/override.conf
  ...
```

## Template Units

### `backend-cron@.service` (template)

Runs the shared HTTP script and uses a per-job lock to prevent overlap.

### `backend-cron@.timer` (template)

Defines a default schedule (which each job override should clear and replace).

## Adding a New Cron Job

### 0. Choose a job name

Pick a stable name used in unit instances and folder names, e.g.:

- `update-expire-at`
- `recalc-stats`
- `sync-foo`

You will enable it as:

```
backend-cron@<job>.timer
```

---

### 1. Create the service override (endpoint / “what it hits”)

Create folder:

```
infrastructure/cron/backend-cron@<job>.service.d/
```

Create file:
`override.conf`

Example:

```ini
[Service]
# Clear the template ExecStart
ExecStart=

# Call the shared script with a job-specific URL
ExecStart=/usr/bin/flock -n /run/lock/backend-cron-<job>.lock \
  /opt/schedulers/scheduler-post-request.sh \
  http://127.0.0.1:5000/api/your/endpoint
```

Notes:

- The folder name **must** be exactly: `backend-cron@<job>.service.d`
- The URL is passed as an argument to the script.
- The lock file name should be unique per job.

---

### 2. Create the timer override (schedule / “when it runs”)

Create folder:

```
infrastructure/cron/backend-cron@<job>.timer.d/
```

Create file:
`override.conf`

Example (every 5 minutes):

```ini
[Timer]
# Clear template schedule so it doesn't OR with your job schedule
OnCalendar=
OnCalendar=*-*-* *:0/5:00
```

Example (once per day at midnight):

```ini
[Timer]
OnCalendar=
OnCalendar=*-*-* 00:00:00
```

Example (windowed every 15 minutes, with an intentional gap):

```ini
[Timer]
OnCalendar=
OnCalendar=*-*-* 07..23:0/15:00
OnCalendar=*-*-* 00..01:0/15:00
```

Notes:

- Multiple `OnCalendar=` lines are **OR**.
- Always include `OnCalendar=` (blank) first to **clear** the template’s default schedule.

---

### 3. Verify it’s correct (must-do)

Check effective units (template + override merged):

```bash
systemctl cat backend-cron@<job>.service
systemctl cat backend-cron@<job>.timer
```

Check next run times:

```bash
systemctl list-timers --all | grep backend-cron
```

Validate calendar syntax:

```bash
systemd-analyze calendar "*-*-* *:0/5:00"
```

Check logs of a run:

```bash
journalctl -u backend-cron@<job>.service -n 50 --no-pager
```

## Listing Existing Timers

Keep this section up to date when adding/removing crons.

> Tip: verify reality with `systemctl cat backend-cron@<job>.service` and `systemctl cat backend-cron@<job>.timer`, not memory.

| Job (instance)                                 | Endpoint hit                                   | Schedule (OnCalendar) | Notes            |
| ---------------------------------------------- | ---------------------------------------------- | --------------------- | ---------------- |
| `backend-cron@check-password-expiration.timer` | `POST /api/customer/check-password-expiration` | `*-*-* *:0/15:00`     | every 15 minutes |
| `backend-cron@check-voucher-expiration.timer`  | `POST /api/vouchers/check-expiration`          | `*-*-* *:0/5:00`      | every 5 minutes  |
| `backend-cron@sync-expired.timer`              | `POST /api/bookings/sync-expired`              | `*-*-* *:0/5:00`      | every 5 minutes  |
| `backend-cron@sync-completed.timer`            | `POST /api/bookings/sync-completed`            | `*-*-* *:0/5:00`      | every 5 minutes  |
| `backend-cron@sync-account-availability.timer` | `POST /api/bookings/sync-account-availability` | `*-*-* *:0/5:00`      | every 5 minutes  |
| `backend-cron@update-rank.timer`               | `POST /api/accounts/update-rank`               | `*-*-* 00:00:00`      | daily            |

## Quick Troubleshooting

### Overrides not applied

- Folder name must match exactly:

  - `backend-cron@<job>.service.d/override.conf`
  - `backend-cron@<job>.timer.d/override.conf`

- Confirm with:

  ```bash
  systemctl cat backend-cron@<job>.service
  systemctl cat backend-cron@<job>.timer
  ```

### Timer runs too often

- You likely forgot to clear template schedule:

  - add `OnCalendar=` blank line at top of timer override.

### Job overlaps / runs concurrently

- We use `flock`. If you removed it in overrides, re-add it.
- If a run is skipped due to lock, you’ll see it in logs.
