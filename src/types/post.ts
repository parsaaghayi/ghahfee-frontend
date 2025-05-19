export interface Post {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  body: string;
  image?: string;
  user_id: string;
  post_category_id: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePostDTO {
  title: string;
  slug: string;
  summary?: string;
  body: string;
  image?: string;
  user_id: string;
  post_category_id: string;
  is_active?: boolean;
}

export interface UpdatePostDTO extends Partial<CreatePostDTO> {
  id: string;
}

export interface PostFilter {
  search?: string;
  post_category_id?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'title';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 