import type { AccountEntity } from '@/common/entities/account.entity';
import type { DbTransaction } from '@/common/infrastructures/db.client';
import type {
  IAccountRepository,
} from '@/common/repositories/interfaces/account.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import type { IAccountService } from './interfaces/account.service.interface';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository
  ) {}

  async list(
    db: DbTransaction,
  ): Promise<AccountEntity[]> {
    const accounts = await this.accountRepository.list(db);
    return accounts;
  }
}
