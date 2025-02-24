import type { AccountEntity } from '@/common/entities/account.entity';
// DBのクライアント実装を想定
import type { DbTransaction } from '@/common/infrastructures/db.client';
import { Injectable } from '@nestjs/common';
import type { IAccountRepository } from './interfaces/account.repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
  async list(
    db: DbTransaction,
  ): Promise<AccountEntity[]> {
    const mapping = await db.account.getAll();
    return mapping;
  }
}
