import { DbClientModule } from '@/common/infrastructures/db.module';
import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account.service.module';
import { AccountsUsecase } from './account.usecase';

@Module({
  imports: [DbClientModule, AccountServiceModule],
  providers: [
    {
      provide: 'IAccountsUsecase',
      useClass: AccountsUsecase,
    },
  ],
  exports: ['IAccountsUsecase'],
})
export class AccountUsecaseModule {}
