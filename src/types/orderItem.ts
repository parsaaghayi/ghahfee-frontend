export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderItemDTO {
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
}

export interface UpdateOrderItemDTO extends Partial<CreateOrderItemDTO> {
  id: string;
}

export interface OrderItemFilter {
  order_id?: string;
  product_id?: string;
  page?: number;
  per_page?: number;
} 