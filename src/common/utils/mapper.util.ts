import type { Timestamp } from '@/proto-gen/google/protobuf/timestamp';

/**
 * Converts a Date object to a Protobuf Timestamp object.
 *
 * @param time - The Date object to be converted.
 * @returns A Protobuf Timestamp object representing the same point in time.
 */
export function toProtobufTimestamp(time?: Date): Timestamp {
  const seconds = time ? Math.floor(time.getTime() / 1000) : 0;
  const nanos = time ? time.getMilliseconds() * 1000000 : 0;
  return { seconds, nanos };
}

/**
 * Get value by Key from a Map.
 * @param map
 * @param key
 * @returns value or null
 */
export function getValueByKey<K, V>(map: Map<K, V>, key: K): V | null {
  return map.get(key) ?? null;
}

/**
 * Get key by Value from a Map.
 * @param map
 * @param value
 * @returns key or null
 */
export function getKeyByValue<K, V>(map: Map<K, V>, value: V): K | null {
  for (const [key, val] of map) {
    if (val === value) {
      return key;
    }
  }
  return null;
}
