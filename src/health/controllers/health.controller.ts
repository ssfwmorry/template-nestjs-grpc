import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  HEALTH_SERVICE_NAME,
  type HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
  HealthControllerMethods,
  type HealthController as HealthServiceController,
} from '../proto-gen/health';
import { DisableGlobalLoggingInterceptor } from '@/common/decorators/disable-global-logging-interceptor.decorator';
import { DisableGlobalAuthGuard } from '@/common/decorators/disable-global-auth-guard.decorator';

@Controller('health')
@HealthControllerMethods()
export class HealthController implements HealthServiceController {
  @GrpcMethod(HEALTH_SERVICE_NAME, 'Check')
  @DisableGlobalAuthGuard()
  @DisableGlobalLoggingInterceptor()
  check(): HealthCheckResponse {
    const res: HealthCheckResponse = {
      status: HealthCheckResponse_ServingStatus.SERVING,
    };
    return res;
  }
}
