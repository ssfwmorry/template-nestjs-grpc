import type {
  ListAccountsRequest,
  ListAccountsResponse,
} from '@/proto-gen/services/account';
import type {
  ListAccountsInput,
} from '../../dtos/account.input';
import { ListAccountsOutput } from '../../dtos/account.output';

export interface IAccountMapper {
  toListAccountsInput(request: ListAccountsRequest): ListAccountsInput;
  toListAccountsResponse(output: ListAccountsOutput): ListAccountsResponse;
}
