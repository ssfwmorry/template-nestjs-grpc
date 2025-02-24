import type {
  ListAccountsInput,
} from '@/domains/account/dtos/account.input';
import { ListAccountsOutput } from '../../dtos/account.output';

export interface IAccountsUsecase {
  listAccounts(input: ListAccountsInput): Promise<ListAccountsOutput>;
}
