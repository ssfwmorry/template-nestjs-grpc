import { status } from '@grpc/grpc-js';
import { type ZodError, type ZodSchema, z } from 'zod';
import { GrpcInvalidArgumentException } from '../exceptions/grpc.exception';
import { getDefaultGrpcErrorMessage } from './exception.util';

export function validate<T>(zod: ZodSchema, request: T): void {
  const result = zod.safeParse(request);
  if (!result.success) {
    throw new GrpcInvalidArgumentException(
      getDefaultGrpcErrorMessage(status.INVALID_ARGUMENT),
      result.error.issues.map((issue: ZodError['issues'][number]) => ({
        field: issue.path.join('.'),
        reason: issue.message,
      }))
    );
  }
}
