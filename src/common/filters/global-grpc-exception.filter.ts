import { extractGrpcStatus } from '@/common/utils/exception.util';
import { Catch, type RpcExceptionFilter } from '@nestjs/common';
import { type Observable, throwError } from 'rxjs';

@Catch(Error)
export class GlobalGrpcExceptionFilter implements RpcExceptionFilter {
  // biome-ignore lint/suspicious/noExplicitAny: For convenience as a base code
  catch(exception: Error): Observable<any> {
    const gRPCStatus = extractGrpcStatus(exception);
    return throwError(() => gRPCStatus);
  }
}
