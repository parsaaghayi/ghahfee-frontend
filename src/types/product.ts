export interface Product {
  is_bestseller: any;
  images: any;
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  price: number;
  discount_price?: number;
  stock: number;
  sku?: string;
  is_active: boolean;
  is_featured: boolean;
  sales_count: number;
  wishlist_count: number;
  cart_count: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CreateProductDTO {
  title: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  price: number;
  discount_price?: number;
  stock: number;
  sku?: string;
  is_active?: boolean;
  is_featured?: boolean;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string;
}

export interface ProductFilter {
  search?: string;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  is_active?: boolean;
  category_id?: string;
  tag_id?: string;
  sort_by?: 'price' | 'created_at' | 'sales_count';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 