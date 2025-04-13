export class SanityError extends Error {
    status: number;
    context?: any;
  
    constructor(message: string, status = 500, context?: any) {
      super(message);
      this.name = 'SanityError';
      this.status = status;
      this.context = context;
    }
  }