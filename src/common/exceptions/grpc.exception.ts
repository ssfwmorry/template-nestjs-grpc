import { getDefaultGrpcErrorMessage } from '@/common/utils/exception.util';
import { status } from '@grpc/grpc-js';

// biome-ignore lint/suspicious/noExplicitAny: Any is used here to allow any type of detail.
type GrpcExceptionDetail = any;
export type GrpcInvalidArgumentDetails = { field: string; reason: string }[];

function createGrpcExceptionClass<T extends GrpcExceptionDetail>(code: number) {
  return class extends GrpcException {
    constructor(message: string = getDefaultGrpcErrorMessage(code), detail?: T) {
      super(code, message, detail);
    }
  };
}

export class GrpcException extends Error {
  constructor(
    public readonly code: number,
    message: string,
    public readonly detail?: GrpcExceptionDetail
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const GrpcCanceledException = createGrpcExceptionClass(status.CANCELLED);
export const GrpcUnknownException = createGrpcExceptionClass(status.UNKNOWN);
export const GrpcInvalidArgumentException = createGrpcExceptionClass<GrpcInvalidArgumentDetails>(status.INVALID_ARGUMENT);
export const GrpcDeadlineExceededException = createGrpcExceptionClass(status.DEADLINE_EXCEEDED);
export const GrpcNotFoundException = createGrpcExceptionClass(status.NOT_FOUND);
export const GrpcAlreadyExistsException = createGrpcExceptionClass(status.ALREADY_EXISTS);
export const GrpcPermissionDeniedException = createGrpcExceptionClass(status.PERMISSION_DENIED);
export const GrpcResourceExhaustedException = createGrpcExceptionClass(status.RESOURCE_EXHAUSTED);
export const GrpcFailedPreconditionException = createGrpcExceptionClass(status.FAILED_PRECONDITION);
export const GrpcAbortedException = createGrpcExceptionClass(status.ABORTED);
export const GrpcOutOfRangeException = createGrpcExceptionClass(status.OUT_OF_RANGE);
export const GrpcUnimplementedException = createGrpcExceptionClass(status.UNIMPLEMENTED);
export const GrpcInternalException = createGrpcExceptionClass(status.INTERNAL);
export const GrpcUnavailableException = createGrpcExceptionClass(status.UNAVAILABLE);
export const GrpcDataLossException = createGrpcExceptionClass(status.DATA_LOSS);
export const GrpcUnauthenticatedException = createGrpcExceptionClass(status.UNAUTHENTICATED);
