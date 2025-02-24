import type { AccountEntity } from '@/common/entities/account.entity';
import type { DbTransaction } from '@/common/infrastructures/db.client';

export interface IAccountService {
  list(db: DbTransaction): Promise<AccountEntity[]>;
}
