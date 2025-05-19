export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTagDTO {
  name: string;
  slug: string;
}

export interface UpdateTagDTO extends Partial<CreateTagDTO> {
  id: string;
}

export interface TagFilter {
  search?: string;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 