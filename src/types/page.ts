export type PageType = 'Static' | 'Landing';

export interface Page {
  id: string;
  title: string;
  slug: string;
  type: PageType;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePageDTO {
  title: string;
  slug: string;
  type: PageType;
  is_published?: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface UpdatePageDTO extends Partial<CreatePageDTO> {
  id: string;
}

export interface PageFilter {
  search?: string;
  type?: PageType;
  is_published?: boolean;
  sort_by?: 'created_at' | 'title';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 