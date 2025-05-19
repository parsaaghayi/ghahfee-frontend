export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateWishlistDTO {
  user_id: string;
  product_id: string;
}

export interface UpdateWishlistDTO extends Partial<CreateWishlistDTO> {
  id: string;
}

export interface WishlistFilter {
  user_id?: string;
  product_id?: string;
  page?: number;
  per_page?: number;
} 