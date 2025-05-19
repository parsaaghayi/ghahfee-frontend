export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  parent_id?: string;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  id: string;
}

export interface CategoryFilter {
  search?: string;
  parent_id?: string;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 