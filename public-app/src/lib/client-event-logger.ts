import { interceptedAxios } from "./axios";

export type ClientEventName =
  | "force_finish_dialog_opened"
  | "force_finish_confirm_clicked"
  | "force_finish_request_started"
  | "force_finish_request_completed"
  | "force_finish_request_failed"
  | "client_error_boundary_triggered"
  | "dashboard_viewed"
  | "dashboard_orders_loaded";

type LogClientEventParams = {
  eventName: ClientEventName;
  actionId?: string;
  bookingId?: string;
  accountId?: number;
  confirmDelayMs?: number;
  metadata?: Record<string, unknown>;
};

function logClientEvent(params: LogClientEventParams): Promise<void> {
  return interceptedAxios
    .post("/api/client-events", {
      eventName: params.eventName,
      actionId: params.actionId,
      bookingId: params.bookingId,
      accountId: params.accountId,
      path: window.location.pathname,
      confirmDelayMs: params.confirmDelayMs,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      metadata: params.metadata
    })
    .then(() => {})
    .catch(() => {});
}

let _lastKnownActionId: string | null = null;

export function setLastKnownActionId(actionId: string): void {
  _lastKnownActionId = actionId;
  try {
    sessionStorage.setItem("lastKnownActionId", actionId);
  } catch {}
}

export function getLastKnownActionId(): string | null {
  if (_lastKnownActionId) return _lastKnownActionId;
  try {
    _lastKnownActionId = sessionStorage.getItem("lastKnownActionId");
  } catch {}
  return _lastKnownActionId;
}

export { logClientEvent };