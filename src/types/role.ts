export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRoleDTO {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateRoleDTO extends Partial<CreateRoleDTO> {
  id: string;
}

export interface RoleFilter {
  search?: string;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 