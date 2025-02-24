import type { Metadata } from '@grpc/grpc-js';

export interface IAuthService {
  validateMetadata(metadata: Metadata): Promise<boolean>;
}
