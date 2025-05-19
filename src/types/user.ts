export type UserStatus = 'active' | 'inactive' | 'banned';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  is_admin: boolean;
  status: UserStatus;
  email_verified_at?: string;
  last_login_at?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  is_admin?: boolean;
  status?: UserStatus;
}

export interface UpdateUserDTO extends Partial<Omit<CreateUserDTO, 'password'>> {
  id: string;
  password?: string;
}

export interface UserFilter {
  search?: string;
  is_admin?: boolean;
  status?: UserStatus;
  email_verified?: boolean;
  start_date?: string;
  end_date?: string;
  sort_by?: 'created_at' | 'last_login_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 