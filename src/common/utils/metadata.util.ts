import type { Metadata } from '@grpc/grpc-js';
import { GrpcInvalidArgumentException } from '../exceptions/grpc.exception';

export const metadataKey = {
  REQUEST_ID: 'request-id',
} as const;

export type MetadataKey = (typeof metadataKey)[keyof typeof metadataKey];

/**
 * Get metadata value as string from the metadata.
 *
 * @param metadata - metadata of gRPC request
 * @param key - key of metadata
 * @returns metadata value as string. if values is invalid, return null.
 */
export function metadataString(metadata: Metadata, key: MetadataKey): string | null {
  const values = metadata.get(key);
  if (!values || values.length !== 1 || !values[0]) {
    return null;
  }

  const str = values[0].toString().trim();
  if (!str) return null;

  return str;
}

export function metadataNumber(metadata: Metadata, key: MetadataKey): number | null {
  const str = metadataString(metadata, key);
  if (str === null) {
    return null;
  }
  const num = Number(str);
  if (Number.isNaN(num)) {
    throw new GrpcInvalidArgumentException(`invalid ${key}: not a number`);
  }
  return num;
}

/**
 * This function converts Metadata to a key-value object. \
 * ex) \
 * const m = new Metadata(); \
 * m.set('key1', 'value1'); \
 * m.set('key2', 'value2'); \
 * metadataObject(m); // { 'key1': 'value1', 'key2': 'value2' }
 *
 * @param metadata - grpc metadata
 * @returns - key-value object
 */
export function metadataObject(metadata: Metadata): Record<string, string> {
  const metadataMap = metadata.getMap();
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadataMap)) {
    result[key.toString()] = value.toString();
  }
  return result;
}
