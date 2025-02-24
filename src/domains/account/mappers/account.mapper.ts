import { type AccountEntity } from '@/common/entities/account.entity';
import { toProtobufTimestamp } from '@/common/utils/mapper.util';
import { Injectable } from '@nestjs/common';
import type { IAccountMapper } from './interfaces/account.mapper.interface';
import { Account } from '@/proto-gen/models/account';
import { ListAccountsRequest, ListAccountsResponse } from '@/proto-gen/services/account';
import { ListAccountsInput } from '../dtos/account.input';
import { ListAccountsOutput } from '../dtos/account.output';

@Injectable()
export class AccountMapper implements IAccountMapper {
  private toModel(entity: AccountEntity): Account {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: {value: toProtobufTimestamp(entity.createdAt)},
      updatedAt: {value: toProtobufTimestamp(entity.updatedAt)},
    } as Account;
  }

  toListAccountsInput(request: ListAccountsRequest): ListAccountsInput {
    return {};
  }

  /**
   * convert ListAccountsOutput to ListAccountsResponse.
   * @param output ListAccountsOutput
   * @returns ListAccountsResponse
   */
  toListAccountsResponse(output: ListAccountsOutput): ListAccountsResponse {
    return {
      accounts: output.accounts.map((e) => this.toModel(e)),
      totalCount: output.totalCount,
    };
  }
}
