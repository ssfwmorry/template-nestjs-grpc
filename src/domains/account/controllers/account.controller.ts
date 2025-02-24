import { handleGrpcMetadata } from '@/common/metadata/handle';
import { validate } from '@/common/utils/validator.util';
import {
  ACCOUNT_SERVICE_NAME,
  AccountServiceControllerMethods,
  type ListAccountsRequest,
  type ListAccountsResponse,
} from '@/proto-gen/services/account';
import type { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type { IAccountMapper } from '../mappers/interfaces/account.mapper.interface';
import type { IAccountsUsecase } from '../usecases/interfaces/account.usecase.interface';
import { listAccountsRequestSchema } from '../validators/list-accounts.validator';

@Controller('account')
@AccountServiceControllerMethods()
export class AccountController {
  constructor(
    @Inject('IAccountMapper')
    private readonly accountMapper: IAccountMapper,
    @Inject('IAccountsUsecase')
    private readonly accountsUsecase: IAccountsUsecase
  ) {}

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'ListAccounts')
  async listAccounts(
    request: ListAccountsRequest,
    metadata: Metadata,
    call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<ListAccountsResponse> {
    handleGrpcMetadata<ListAccountsRequest, ListAccountsResponse>(metadata, call);

    validate(listAccountsRequestSchema, request);
    const input = this.accountMapper.toListAccountsInput(request);
    const output = await this.accountsUsecase.listAccounts(input);
    const response = this.accountMapper.toListAccountsResponse(output);
    return response;
  }
}
