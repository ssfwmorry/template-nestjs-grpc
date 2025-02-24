import { join } from 'node:path';
import { AppModule } from '@/app.module';
import { GlobalGrpcExceptionFilter } from '@/common/filters/global-grpc-exception.filter';
import { GlobalLoggingInterceptor } from '@/common/interceptors/global-logging.interceptor';
import { ReflectionService } from '@grpc/reflection';
import { NestFactory, Reflector } from '@nestjs/core';
import { type GrpcOptions, Transport } from '@nestjs/microservices';
import { GlobalAuthGuard } from './common/guards/global-auth.guard';
import { protobufPackage as healthPackage } from './health/proto-gen/health';
import { protobufPackage as apiPackage } from './proto-gen/api';

const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:3000`,
    package: [healthPackage, apiPackage],
    protoPath: [join(__dirname, 'health/proto/health.proto'), join(__dirname, 'proto/api.proto')],
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, grpcOptions);

  // Global filter to handle all exceptions, including unhandled ones.
  app.useGlobalFilters(new GlobalGrpcExceptionFilter());
  // Global interceptor to log all requests and responses.
  app.useGlobalInterceptors(new GlobalLoggingInterceptor(app.get(Reflector)));
  // Global guard to authenticate all requests.
  app.useGlobalGuards(new GlobalAuthGuard(app.get(Reflector), app.get('IAuthService')));
  await app.listen();
}

bootstrap();
