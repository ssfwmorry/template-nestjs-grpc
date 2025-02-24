import { Module } from '@nestjs/common';
import { AccountMapper } from './account.mapper';

@Module({
  providers: [
    {
      provide: 'IAccountMapper',
      useClass: AccountMapper,
    },
  ],
  exports: ['IAccountMapper'],
})
export class AccountMapperModule {}
