export interface Seo {
  id: string;
  seoable_type: string;
  seoable_id: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  is_index: boolean;
  is_follow: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSeoDTO {
  seoable_type: string;
  seoable_id: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  is_index?: boolean;
  is_follow?: boolean;
}

export interface UpdateSeoDTO extends Partial<CreateSeoDTO> {
  id: string;
}

export interface SeoFilter {
  seoable_type?: string;
  seoable_id?: string;
  is_index?: boolean;
  is_follow?: boolean;
  sort_by?: 'created_at' | 'seoable_type';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 