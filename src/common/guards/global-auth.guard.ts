import { DISABLE_GLOBAL_AUTH_GUARD } from '@/common/decorators/disable-global-auth-guard.decorator';
import { GrpcUnauthenticatedException } from '@/common/exceptions/grpc.exception';
import { CustomLogger } from '@/common/log/custom-logger';
import type { IAuthService } from '@/domains/auth/services/interfaces/auth.service.interface';
import type { Metadata } from '@grpc/grpc-js';
import { type CanActivate, type ExecutionContext, Inject, Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: Because type importing Reflector disables dependency injection
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('IAuthService')
    private authService: IAuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDisableAuth = this.reflector.getAllAndOverride<boolean>(DISABLE_GLOBAL_AUTH_GUARD, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isDisableAuth) {
      return true;
    }

    try {
      const metadata: Metadata = context.switchToRpc().getContext();
      return await this.authService.validateMetadata(metadata);
    } catch (error) {
      const err =
        error instanceof GrpcUnauthenticatedException
          ? error
          : new GrpcUnauthenticatedException(`Fail to authenticate: ${error.message}`);

      const logger = new CustomLogger(GlobalAuthGuard.name);
      logger.errorLog(err);
      throw err;
    }
  }
}
