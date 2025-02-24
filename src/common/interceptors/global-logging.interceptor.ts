import { Metadata } from '@grpc/grpc-js';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { DISABLE_GLOBAL_LOGGING_INTERCEPTOR } from '../decorators/disable-global-logging-interceptor.decorator';
import { CustomLogger } from '../log/custom-logger';
import { type StoredMetadata, metadataStorage } from '../log/storage';
import { setResponseMetadata } from '../metadata/handle';
import { metadataKey, metadataObject, metadataString } from '../utils/metadata.util';

/**
 * A NestJS interceptor that logs incoming gRPC requests and their responses and any errors.
 *
 * see: https://stackoverflow.com/questions/67136005/how-to-use-asynclocalstorage-for-an-observable
 */
@Injectable()
export class GlobalLoggingInterceptor implements NestInterceptor {
  private readonly ARG_INDEX_PAYLOAD = 0;
  private readonly ARG_INDEX_METADATA = 1;
  constructor(private readonly reflector: Reflector) {}

  /**
   * Intercepts and logs the execution time, request metadata, and payload for each request and response.
   *
   * @param {ExecutionContext} context - The execution context containing details about the request.
   * @param {CallHandler} next - The next handler in the request pipeline.
   * @return {Observable<any>} - An observable that contains the response data or error.
   */
  // biome-ignore lint/suspicious/noExplicitAny: For convenience as a base code
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isDisableLogging = this.reflector.getAllAndOverride<boolean>(DISABLE_GLOBAL_LOGGING_INTERCEPTOR, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isDisableLogging) {
      return next.handle();
    }

    const [controller, method] = [context.getClass().name, context.getHandler().name];
    const logger = new CustomLogger(`${GlobalLoggingInterceptor.name}.${controller}.${method}`);

    const payload = context.getArgByIndex(this.ARG_INDEX_PAYLOAD);
    const requestMetadata = context.getArgByIndex(this.ARG_INDEX_METADATA) as Metadata;
    const { responseMetadata, storedMetadata } = this.storedMetadata(requestMetadata);

    return new Observable((sub) => {
      const subscription = metadataStorage.run(storedMetadata, () => {
        return this.logHandler(next, logger, requestMetadata, payload, responseMetadata).subscribe(sub);
      });
      return () => subscription.unsubscribe();
    });
  }

  private storedMetadata(metadata: Metadata): { responseMetadata: Metadata; storedMetadata: StoredMetadata } {
    const requestId = metadataString(metadata, metadataKey.REQUEST_ID);

    // generate new metadata due to input metadata shouldn't be updated
    const responseMetadata = new Metadata();
    setResponseMetadata(responseMetadata, requestId);

    return { responseMetadata, storedMetadata: { requestId } };
  }

  private logHandler(
    next: CallHandler,
    logger: CustomLogger,
    requestMetadata: Metadata,
    // biome-ignore lint/suspicious/noExplicitAny: Various types of payload can be given
    requestPayload: any,
    responseMetadata: Metadata,
  ): Observable<void> {
    logger.requestLog(metadataObject(requestMetadata), requestPayload);

    return next.handle().pipe(
      tap({
        next: () => {
          logger.responseLog(metadataObject(responseMetadata));
        },
        error: (error) => {
          logger.errorLog(error);
        },
      })
    );
  }
}
