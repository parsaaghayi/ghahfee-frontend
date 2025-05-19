export interface PostCategory {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePostCategoryDTO {
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  is_active?: boolean;
}

export interface UpdatePostCategoryDTO extends Partial<CreatePostCategoryDTO> {
  id: string;
}

export interface PostCategoryFilter {
  search?: string;
  parent_id?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 