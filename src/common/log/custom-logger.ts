import type { status } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { GrpcException } from '../exceptions/grpc.exception';
import { type StoredMetadata, currentMetadata } from './storage';

const logLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const;
type LogLevel = (typeof logLevel)[keyof typeof logLevel];
export const logLevelForTest = logLevel;

const logType = {
  REQUEST: 'REQUEST',
  RESPONSE: 'RESPONSE',
  CUSTOM: 'CUSTOM',
  ERROR: 'ERROR',
} as const;
type LogType = (typeof logType)[keyof typeof logType];
export const logTypeForTest = logType;

type RequestLogData = {
  metadata: Record<string, string>;
  request: unknown;
};
type ResponseLogData = {
  code: status.OK;
  metadata: Record<string, string>;
};
type CustomLogData = {
  message: string;
  detail: unknown;
};
type ErrorLogData = {
  code: status;
  message: string;
  detail: unknown;
};

type LogData = {
  level: LogLevel;
  type: LogType;
  time: string;
  requestId: string;
  detail: { context: string } & (RequestLogData | ResponseLogData | CustomLogData | ErrorLogData);
};

export class CustomLogger {
  constructor(private readonly context: string) {}

  private write(level: LogLevel, type: LogType, detail: RequestLogData | ResponseLogData | CustomLogData | ErrorLogData) {
    const time = new Date().toISOString();
    const { requestId } = currentMetadata() as StoredMetadata;
    const logData: LogData = {
      level,
      type,
      time,
      requestId,
      detail: { context: this.context, ...detail },
    };

    const text = JSON.stringify(logData, null, '  ');
    // biome-ignore lint/suspicious/noConsole lint/suspicious/noConsoleLog: For logging
    console.log(text);
  }

  /** Log API request before gRPC method in controller is called */
  requestLog(metadata: Record<string, string>, request: unknown) {
    const detailData: RequestLogData = { metadata, request };
    this.write(logLevel.INFO, logType.REQUEST, detailData);
  }
  /** Log API response after gRPC method in controller is called */
  responseLog(metadata: Record<string, string>) {
    const detailData: ResponseLogData = { code: Status.OK, metadata };
    this.write(logLevel.INFO, logType.RESPONSE, detailData);
  }
  errorLog(error: Error) {
    let detailData: ErrorLogData;
    if (error instanceof GrpcException) {
      detailData = {
        code: error.code,
        message: error.message,
        detail: error.detail,
      };
    } else {
      detailData = {
        code: Status.UNKNOWN,
        message: 'No GrpcException',
        detail: error,
      };
    }

    this.write(logLevel.ERROR, logType.ERROR, detailData);
  }

  private customLog(level: LogLevel, message: string, detail: unknown | undefined) {
    const detailData: CustomLogData = { message, detail };
    this.write(level, logType.CUSTOM, detailData);
  }

  /** Log with 'DEBUG' level */
  debug(message: string, detail?: unknown) {
    this.customLog(logLevel.DEBUG, message, detail);
  }
  /** Log with 'INFO' level */
  info(message: string, detail?: unknown) {
    this.customLog(logLevel.INFO, message, detail);
  }
  /** Log with 'WARN' level */
  warn(message: string, detail?: unknown) {
    this.customLog(logLevel.WARN, message, detail);
  }
}
