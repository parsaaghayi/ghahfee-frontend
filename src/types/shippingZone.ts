export interface ShippingZone {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateShippingZoneDTO {
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface UpdateShippingZoneDTO extends Partial<CreateShippingZoneDTO> {
  id: string;
}

export interface ShippingZoneFilter {
  search?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 