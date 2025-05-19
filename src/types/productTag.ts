export interface ProductTag {
  id: string;
  product_id: string;
  tag_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductTagDTO {
  product_id: string;
  tag_id: string;
}

export interface UpdateProductTagDTO extends Partial<CreateProductTagDTO> {
  id: string;
}

export interface ProductTagFilter {
  product_id?: string;
  tag_id?: string;
  page?: number;
  per_page?: number;
} 