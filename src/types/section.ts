export interface Section {
  id: string;
  page_id: string;
  section_type: string;
  content: any;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSectionDTO {
  page_id: string;
  section_type: string;
  content: any;
  display_order?: number;
  is_active?: boolean;
}

export interface UpdateSectionDTO extends Partial<CreateSectionDTO> {
  id: string;
}

export interface SectionFilter {
  page_id?: string;
  section_type?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'display_order';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 