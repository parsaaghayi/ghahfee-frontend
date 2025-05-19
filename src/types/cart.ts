export interface Cart {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCartDTO {
  user_id: string;
}

export interface UpdateCartDTO extends Partial<CreateCartDTO> {
  id: string;
}

export interface CartFilter {
  user_id?: string;
  page?: number;
  per_page?: number;
} 