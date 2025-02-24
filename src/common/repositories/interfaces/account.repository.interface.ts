import type { AccountEntity } from '@/common/entities/account.entity';
// DBのクライアント実装を想定
import type { DbTransaction } from '@/common/infrastructures/db.client';

export interface IAccountRepository {
  list(db: DbTransaction): Promise<AccountEntity[]>;
}
