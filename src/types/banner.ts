export interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string;
  alt?: string;
  type?: string;
  is_active: boolean;
  display_order: number;
  starts_at?: string;
  ends_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBannerDTO {
  title: string;
  image: string;
  link?: string;
  alt?: string;
  type?: string;
  is_active?: boolean;
  display_order?: number;
  starts_at?: string;
  ends_at?: string;
}

export interface UpdateBannerDTO extends Partial<CreateBannerDTO> {
  id: string;
}

export interface BannerFilter {
  search?: string;
  is_active?: boolean;
  type?: string;
  sort_by?: 'created_at' | 'display_order';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 