import { DbClient } from '@/common/infrastructures/db.client';
import type { Metadata } from '@grpc/grpc-js';
import { Inject } from '@nestjs/common';
import type { IAuthService } from './interfaces/auth.service.interface';

export class AuthService implements IAuthService {

  constructor(
    @Inject(DbClient)
    private readonly db: DbClient,
  ) {}

  async validateMetadata(metadata: Metadata): Promise<boolean> {
    // access DB, and validate metadata
    return true;
  }

}
