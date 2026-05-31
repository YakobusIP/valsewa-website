import type { Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      id: string;
      correlationId: string;
      log: Logger;
      customer?: {
        id: number;
      };
      adminUsername?: string;
      isScheduler?: boolean;
    }
  }
}

export {};
