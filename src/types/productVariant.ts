export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  weight: string;
  grind_type: string;
  attributes?: any;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductVariantDTO {
  product_id: string;
  sku: string;
  price: number;
  sale_price?: number;
  stock_quantity?: number;
  weight: string;
  grind_type: string;
  attributes?: any;
  is_active?: boolean;
}

export interface UpdateProductVariantDTO extends Partial<CreateProductVariantDTO> {
  id: string;
}

export interface ProductVariantFilter {
  product_id?: string;
  sku?: string;
  is_active?: boolean;
  page?: number;
  per_page?: number;
} 