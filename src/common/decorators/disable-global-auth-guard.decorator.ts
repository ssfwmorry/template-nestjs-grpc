import { SetMetadata } from '@nestjs/common';

export const DISABLE_GLOBAL_AUTH_GUARD = 'DISABLE_GLOBAL_AUTH_GUARD';

export const DisableGlobalAuthGuard = () => SetMetadata(DISABLE_GLOBAL_AUTH_GUARD, true);
