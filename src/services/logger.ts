export interface ILogger {
  logInfo(message: string, data?: unknown): void;
  logWarn(message: string, data?: unknown): void;
  logError(message: string, data?: unknown): void;
  logDebug(message: string, data?: unknown): void;
}

export class Logger implements ILogger {
  debugEnabled = true;
  constructor() {
    this.debugEnabled = process.env.NODE_ENV != 'production';
  }

  private logWrap(method: CallableFunction, message: string, data?: unknown) {
    message = `[${this.constructor.name}] ${message}`;

    if (data) {
      method(message, data);
    } else {
      method(message);
    }
  }

  logInfo(message: string, data?: unknown): void {
    this.logWrap(console.info, message, data);
  }
  logWarn(message: string, data?: unknown): void {
    this.logWrap(console.warn, message, data);
  }
  logError(message: string, data?: unknown): void {
    this.logWrap(console.error, message, data);
  }
  logDebug(message: string, data?: unknown): void {
    if (this.debugEnabled) {
      this.logWrap(console.debug, message, data);
    }
  }
}
