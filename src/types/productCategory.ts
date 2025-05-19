export interface ProductCategory {
  id: string;
  product_id: string;
  category_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductCategoryDTO {
  product_id: string;
  category_id: string;
}

export interface UpdateProductCategoryDTO extends Partial<CreateProductCategoryDTO> {
  id: string;
}

export interface ProductCategoryFilter {
  product_id?: string;
  category_id?: string;
  page?: number;
  per_page?: number;
} 