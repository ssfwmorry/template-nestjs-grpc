import { z } from 'zod';

export const listAccountsRequestSchema = z.object({
});

export type ListAccountsRequestSchema = z.input<typeof listAccountsRequestSchema>;
