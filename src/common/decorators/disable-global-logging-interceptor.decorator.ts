import { SetMetadata } from '@nestjs/common';

export const DISABLE_GLOBAL_LOGGING_INTERCEPTOR = 'DISABLE_GLOBAL_LOGGING_INTERCEPTOR';

export const DisableGlobalLoggingInterceptor = () => SetMetadata(DISABLE_GLOBAL_LOGGING_INTERCEPTOR, true);
