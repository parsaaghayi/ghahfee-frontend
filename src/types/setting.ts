export interface Setting {
  id: string;
  key: string;
  value?: string;
  description?: string;
  is_sensitive: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSettingDTO {
  key: string;
  value?: string;
  description?: string;
  is_sensitive?: boolean;
}

export interface UpdateSettingDTO extends Partial<CreateSettingDTO> {
  id: string;
}

export interface SettingFilter {
  search?: string;
  is_sensitive?: boolean;
  sort_by?: 'created_at' | 'key';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 