import { Module } from '@nestjs/common';
import { AccountMapperModule } from '../mappers/account.mapper.module';
import { AccountController } from './account.controller';
import { AccountUsecaseModule } from '../usecases/account.usecase.module';

@Module({
  imports: [AccountMapperModule, AccountUsecaseModule],
  controllers: [AccountController],
})
export class AccountModule {}
