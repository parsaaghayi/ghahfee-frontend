export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'wallet' | 'online';

export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  total_amount: number;
  tracking_code?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderDTO {
  user_id: string;
  address_id: string;
  payment_method: PaymentMethod;
  total_amount: number;
  notes?: string;
}

export interface UpdateOrderDTO extends Partial<CreateOrderDTO> {
  id: string;
  status?: OrderStatus;
  tracking_code?: string;
}

export interface OrderFilter {
  user_id?: string;
  status?: OrderStatus;
  payment_method?: PaymentMethod;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
  end_date?: string;
  sort_by?: 'created_at' | 'total_amount';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 