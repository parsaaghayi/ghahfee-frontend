export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCartItemDTO {
  cart_id: string;
  product_id: string;
  quantity: number;
}

export interface UpdateCartItemDTO extends Partial<CreateCartItemDTO> {
  id: string;
}

export interface CartItemFilter {
  cart_id?: string;
  product_id?: string;
  page?: number;
  per_page?: number;
} 