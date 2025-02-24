import { describe, expect, it } from 'vitest';
import { DISABLE_GLOBAL_AUTH_GUARD, DisableGlobalAuthGuard } from './disable-global-auth-guard.decorator';

describe('@DisableGlobalAuthGuard', () => {
  const [key, value] = [DISABLE_GLOBAL_AUTH_GUARD, true];

  class TestClassWithMethod {
    @DisableGlobalAuthGuard()
    testMethod(): void {
      return;
    }
  }

  it('should enhance method with expected metadata', () => {
    const testClass = new TestClassWithMethod();
    const metadata = Reflect.getMetadata(key, testClass.testMethod);
    expect(metadata).toBe(value);
  });
});
