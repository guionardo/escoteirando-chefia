import Vue from 'vue';
export interface ILogger {
  logInfo(message: string, data?: unknown): void;
  logWarn(message: string, data?: unknown): void;
  logError(message: string, data?: unknown): void;
  logDebug(message: string, data?: unknown): void;
}

export class Logger implements ILogger {
  debugEnabled = true;
  loggerName = '';

  constructor(loggerName: string | Vue = '') {
    this.debugEnabled = process.env.NODE_ENV != 'production';
    if (typeof loggerName == 'string') {
      this.loggerName = loggerName || this.constructor.name;
    } else {
      if (loggerName instanceof Vue) {
        this.loggerName = loggerName.constructor.name;
      } else {
        this.loggerName = this.constructor.name;
      }
    }
  }

  private logWrap(method: CallableFunction, message: string, data?: unknown) {
    message = `[${this.loggerName}] ${message}`;

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
