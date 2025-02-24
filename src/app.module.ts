import { AccountModule } from '@/domains/account/controllers/account.module';
import { HealthModule } from '@/health/controllers/health.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [AuthModule, HealthModule, AccountModule],
})
export class AppModule {}
