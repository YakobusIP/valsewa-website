import { AsyncLocalStorage } from "async_hooks";
import type { Logger } from "pino";
import type { Request } from "express";
import { createChildLogger } from "./logger";

export type RequestContextStore = {
  requestId: string;
  correlationId: string;
  customerId?: number;
  adminUsername?: string;
  isScheduler?: boolean;
};

const storage = new AsyncLocalStorage<RequestContextStore>();

export function runWithRequestContext<T>(
  store: RequestContextStore,
  fn: () => T
): T {
  return storage.run(store, fn);
}

export function getRequestContext(): RequestContextStore | undefined {
  return storage.getStore();
}

export function patchRequestContext(
  partial: Partial<Omit<RequestContextStore, "requestId" | "correlationId">>
): void {
  const store = storage.getStore();
  if (store) {
    Object.assign(store, partial);
  }
}

export function getContextLogger(bindings: Record<string, unknown>): Logger {
  const ctx = storage.getStore();
  return createChildLogger({
    ...bindings,
    ...(ctx?.requestId ? { requestId: ctx.requestId } : {}),
    ...(ctx?.correlationId ? { correlationId: ctx.correlationId } : {}),
    ...(ctx?.customerId !== undefined ? { customerId: ctx.customerId } : {}),
    ...(ctx?.adminUsername ? { adminUsername: ctx.adminUsername } : {}),
    ...(ctx?.isScheduler ? { isScheduler: ctx.isScheduler } : {})
  });
}

export function refreshRequestLogger(req: Request): void {
  req.log = getContextLogger({});
}
