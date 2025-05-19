export interface Permission {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePermissionDTO {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdatePermissionDTO extends Partial<CreatePermissionDTO> {
  id: string;
}

export interface PermissionFilter {
  search?: string;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 