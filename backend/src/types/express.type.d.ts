declare global {
  namespace Express {
    interface Request {
      customer?: {
        id: number;
      };
    }
  }
}

export {};
