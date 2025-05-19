export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductImageDTO {
  product_id: string;
  image_url: string;
  is_primary?: boolean;
}

export interface UpdateProductImageDTO extends Partial<CreateProductImageDTO> {
  id: string;
}

export interface ProductImageFilter {
  product_id?: string;
  is_primary?: boolean;
  page?: number;
  per_page?: number;
} 