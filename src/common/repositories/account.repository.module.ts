import { Module } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Module({
  providers: [
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
  ],
  exports: ['IAccountRepository'],
})
export class AccountRepositoryModule {}
