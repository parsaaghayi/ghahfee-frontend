export type PaymentTransactionStatus = 'Pending' | 'Success' | 'Failed' | 'Refunded';

export interface PaymentTransaction {
  id: string;
  order_id: string;
  gateway_name: string;
  gateway_transaction_id?: string;
  status: PaymentTransactionStatus;
  amount: number;
  currency_code: string;
  gateway_response?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePaymentTransactionDTO {
  order_id: string;
  gateway_name: string;
  gateway_transaction_id?: string;
  status: PaymentTransactionStatus;
  amount: number;
  currency_code: string;
  gateway_response?: string;
}

export interface UpdatePaymentTransactionDTO extends Partial<CreatePaymentTransactionDTO> {
  id: string;
}

export interface PaymentTransactionFilter {
  order_id?: string;
  gateway_name?: string;
  status?: PaymentTransactionStatus;
  sort_by?: 'created_at' | 'status';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 