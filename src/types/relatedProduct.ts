export interface RelatedProduct {
  id: string;
  product_id: string;
  related_product_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRelatedProductDTO {
  product_id: string;
  related_product_id: string;
}

export interface UpdateRelatedProductDTO extends Partial<CreateRelatedProductDTO> {
  id: string;
}

export interface RelatedProductFilter {
  product_id?: string;
  related_product_id?: string;
  page?: number;
  per_page?: number;
} 