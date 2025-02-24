import { GrpcException } from '@/common/exceptions/grpc.exception';
import { status } from '@grpc/grpc-js';

/**
 * Retrieves the gRPC status code and message from an exception.
 *
 * @param {Error} exception - The exception from which to extract the gRPC status.
 * @return {{code: number, message: string}} An object containing the gRPC status code and message.
 */
export function extractGrpcStatus(exception: Error): { code: number; message: string } {
  if (exception == null) {
    return {
      code: status.UNKNOWN,
      message: JSON.stringify({ message: getDefaultGrpcErrorMessage(status.UNKNOWN) }),
    };
  }

  if (exception instanceof GrpcException) {
    return { code: exception.code, message: JSON.stringify({ message: exception.message, detail: exception.detail }) };
  }

  return {
    code: status.UNKNOWN,
    message: JSON.stringify({ message: getDefaultGrpcErrorMessage(status.UNKNOWN), detail: exception.message }),
  };
}

const DEFAULT_GRPC_ERROR_MESSAGES = {
  // Status code 1
  [status.CANCELLED]: 'Canceled',
  // Status code 2
  [status.UNKNOWN]: 'Unknown error',
  // Status code 3
  [status.INVALID_ARGUMENT]: 'Invalid argument',
  // Status code 4
  [status.DEADLINE_EXCEEDED]: 'Deadline exceeded',
  // Status code 5
  [status.NOT_FOUND]: 'Not found',
  // Status code 6
  [status.ALREADY_EXISTS]: 'Already exists',
  // Status code 7
  [status.PERMISSION_DENIED]: 'Permission denied',
  // Status code 8
  [status.RESOURCE_EXHAUSTED]: 'Resource exhausted',
  // Status code 9
  [status.FAILED_PRECONDITION]: 'Failed precondition',
  // Status code 10
  [status.ABORTED]: 'Aborted',
  // Status code 11
  [status.OUT_OF_RANGE]: 'Out of range',
  // Status code 12
  [status.UNIMPLEMENTED]: 'Unimplemented',
  // Status code 13
  [status.INTERNAL]: 'Internal error',
  // Status code 14
  [status.UNAVAILABLE]: 'Unavailable',
  // Status code 15
  [status.DATA_LOSS]: 'Data loss',
  // Status code 16
  [status.UNAUTHENTICATED]: 'Unauthenticated',
} as const;

export function getDefaultGrpcErrorMessage(code: status): string {
  return DEFAULT_GRPC_ERROR_MESSAGES[code];
}
