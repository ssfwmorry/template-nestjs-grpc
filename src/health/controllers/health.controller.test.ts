import { describe, expect, it } from 'vitest';
import { HealthCheckResponse_ServingStatus } from '../proto-gen/health';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  function createController() {
    return new HealthController();
  }

  describe('check', () => {
    it('Success', () => {
      const response = {
        status: HealthCheckResponse_ServingStatus.SERVING,
      };
      const controller = createController();

      // check controller.
      expect(controller.check()).toEqual(response);
    });
  });
});
