export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateWalletDTO {
  user_id: string;
  balance: number;
  currency: string;
  is_active?: boolean;
}

export interface UpdateWalletDTO extends Partial<CreateWalletDTO> {
  id: string;
}

export interface WalletFilter {
  user_id?: string;
  is_active?: boolean;
  currency?: string;
  min_balance?: number;
  max_balance?: number;
  sort_by?: 'created_at' | 'balance';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 