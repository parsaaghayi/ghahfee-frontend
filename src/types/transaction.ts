export interface Transaction {
  id: string;
  wallet_id: string;
  amount: number;
  type: string;
  description?: string;
  status: string;
  reference_id?: string;
  meta?: any;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTransactionDTO {
  wallet_id: string;
  amount: number;
  type: string;
  description?: string;
  status: string;
  reference_id?: string;
  meta?: any;
}

export interface UpdateTransactionDTO extends Partial<CreateTransactionDTO> {
  id: string;
}

export interface TransactionFilter {
  wallet_id?: string;
  type?: string;
  status?: string;
  page?: number;
  per_page?: number;
} 