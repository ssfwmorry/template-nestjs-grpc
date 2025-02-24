import { Module } from '@nestjs/common';
import { AuthServiceModule } from './services/auth.service.module';

@Module({
  imports: [AuthServiceModule],
})
export class AuthModule {}
