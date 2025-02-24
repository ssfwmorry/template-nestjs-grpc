import { describe, expect, it } from 'vitest';
import { DISABLE_GLOBAL_LOGGING_INTERCEPTOR, DisableGlobalLoggingInterceptor } from './disable-global-logging-interceptor.decorator';

describe('@DisableGlobalLoggingInterceptor', () => {
  const [key, value] = [DISABLE_GLOBAL_LOGGING_INTERCEPTOR, true];

  class TestClassWithMethod {
    @DisableGlobalLoggingInterceptor()
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
