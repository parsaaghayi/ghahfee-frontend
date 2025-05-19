export type CouponDiscountType = 'Percentage' | 'FixedAmount';

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discount_type: CouponDiscountType;
  discount_value: number;
  max_uses?: number;
  uses_per_customer?: number;
  minimum_spend?: number;
  valid_from?: string;
  valid_to?: string;
  is_active: boolean;
  times_used: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCouponDTO {
  code: string;
  description?: string;
  discount_type: CouponDiscountType;
  discount_value: number;
  max_uses?: number;
  uses_per_customer?: number;
  minimum_spend?: number;
  valid_from?: string;
  valid_to?: string;
  is_active?: boolean;
}

export interface UpdateCouponDTO extends Partial<CreateCouponDTO> {
  id: string;
}

export interface CouponFilter {
  search?: string;
  discount_type?: CouponDiscountType;
  is_active?: boolean;
  sort_by?: 'created_at' | 'code';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 