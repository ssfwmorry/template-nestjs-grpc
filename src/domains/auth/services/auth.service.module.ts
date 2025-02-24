import { DbClientModule } from '@/common/infrastructures/db.client.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [DbClientModule],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
  exports: ['IAuthService'],
})
export class AuthServiceModule {}
