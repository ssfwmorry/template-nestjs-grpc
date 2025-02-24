import { Metadata, type ServerUnaryCall } from '@grpc/grpc-js';
import { z } from 'zod';
import {  metadataKey, metadataString } from '../utils/metadata.util';
import { validate } from '../utils/validator.util';

const requestMetadataSchema = z.object({
  requestId: z.string(),
});
type RequestMetadataSchemaType = z.input<typeof requestMetadataSchema>;

export function handleGrpcMetadata<T, S>(metadata: Metadata, call: ServerUnaryCall<T, S>): void {
  const requestId = validateRequestMetadata(metadata);

  setResponseMetadataOnCall<T, S>(call, requestId);
}

function validateRequestMetadata(metadata: Metadata): string {
  const requestId = metadataString(metadata, metadataKey.REQUEST_ID);

  const metadataObject: RequestMetadataSchemaType = {
    requestId,
  };
  validate(requestMetadataSchema, metadataObject);

  return requestId;
}

function setResponseMetadataOnCall<T, S>(call: ServerUnaryCall<T, S>, requestId: string): void {
  if (!requestId) {
    throw new Error('requestId and contextId are required');
  }

  const metadata = new Metadata();
  setResponseMetadata(metadata, requestId);

  call.sendMetadata(metadata);
}

export function setResponseMetadata(metadata: Metadata, requestId: string): void {
  metadata.set(metadataKey.REQUEST_ID, requestId);
}
