import type { AccountEntity } from '@/common/entities/account.entity';

export interface ListAccountsOutput {
  accounts: AccountEntity[];
  totalCount: number;
}
