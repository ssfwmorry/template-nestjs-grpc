import { AccountRepositoryModule } from '@/common/repositories/account.repository.module';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';

@Module({
  imports: [AccountRepositoryModule],
  providers: [
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
  ],
  exports: ['IAccountService'],
})
export class AccountServiceModule {}
