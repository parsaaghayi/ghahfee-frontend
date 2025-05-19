export interface Theme {
  id: string;
  name: string;
  is_active: boolean;
  settings?: any;
  created_at?: string;
  updated_at?: string;
}

export interface CreateThemeDTO {
  name: string;
  is_active?: boolean;
  settings?: any;
}

export interface UpdateThemeDTO extends Partial<CreateThemeDTO> {
  id: string;
}

export interface ThemeFilter {
  search?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 