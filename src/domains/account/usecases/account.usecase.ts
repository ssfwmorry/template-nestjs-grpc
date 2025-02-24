import { DbClient } from '@/common/infrastructures/db.client';
import type {  ListAccountsInput } from '@/domains/account/dtos/account.input';
import { Inject, Injectable } from '@nestjs/common';
import type { IAccountService } from '../services/interfaces/account.service.interface';
import type { IAccountsUsecase } from './interfaces/account.usecase.interface';
import { ListAccountsOutput } from '../dtos/account.output';

@Injectable()
export class AccountsUsecase implements IAccountsUsecase {
  constructor(
    @Inject(DbClient)
    private readonly db: DbClient,
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
  ) {}

  async listAccounts(input: ListAccountsInput): Promise<ListAccountsOutput> {
    const [accounts] = await this.db.$transaction(async (tx) => {
      return await Promise.all([
        this.accountService.list(tx),
      ]);
    });
    return { accounts, totalCount: accounts.length };
  }
}
