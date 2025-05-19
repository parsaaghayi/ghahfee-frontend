export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  parent_id?: string;
  rating?: number;
  comment: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateReviewDTO {
  user_id: string;
  product_id: string;
  parent_id?: string;
  rating?: number;
  comment: string;
  status: string;
}

export interface UpdateReviewDTO extends Partial<CreateReviewDTO> {
  id: string;
}

export interface ReviewFilter {
  user_id?: string;
  product_id?: string;
  status?: string;
  page?: number;
  per_page?: number;
} 