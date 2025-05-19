export interface ProductAttribute {
  id: string;
  product_id: string;
  key: string;
  value: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductAttributeDTO {
  product_id: string;
  key: string;
  value: string;
}

export interface UpdateProductAttributeDTO extends Partial<CreateProductAttributeDTO> {
  id: string;
}

export interface ProductAttributeFilter {
  product_id?: string;
  key?: string;
  page?: number;
  per_page?: number;
} 