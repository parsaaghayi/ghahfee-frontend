export type ShippingCostCalculationType = 'FlatRate' | 'WeightBased';

export interface ShippingMethod {
  id: string;
  shipping_zone_id: string;
  name: string;
  description?: string;
  cost: number;
  cost_calculation_type: ShippingCostCalculationType;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateShippingMethodDTO {
  shipping_zone_id: string;
  name: string;
  description?: string;
  cost: number;
  cost_calculation_type: ShippingCostCalculationType;
  is_active?: boolean;
}

export interface UpdateShippingMethodDTO extends Partial<CreateShippingMethodDTO> {
  id: string;
}

export interface ShippingMethodFilter {
  shipping_zone_id?: string;
  is_active?: boolean;
  cost_calculation_type?: ShippingCostCalculationType;
  sort_by?: 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 