import { AsyncLocalStorage } from 'node:async_hooks';

export const metadataStorage = new AsyncLocalStorage<StoredMetadata>();
export const currentMetadata = () => metadataStorage.getStore() ?? {};

export type StoredMetadata = {
  requestId: string | null;
};
