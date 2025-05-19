export interface Address {
  id: string;
  user_id: string;
  title: string;
  full_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAddressDTO {
  user_id: string;
  title: string;
  full_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface UpdateAddressDTO extends Partial<CreateAddressDTO> {
  id: string;
}

export interface AddressFilter {
  user_id?: string;
  city?: string;
  state?: string;
  country?: string;
  is_default?: boolean;
  page?: number;
  per_page?: number;
} 