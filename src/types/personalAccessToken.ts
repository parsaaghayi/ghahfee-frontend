export interface PersonalAccessToken {
  id: string;
  tokenable_type: string;
  tokenable_id: string;
  name: string;
  token: string;
  abilities?: string;
  last_used_at?: string;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePersonalAccessTokenDTO {
  tokenable_type: string;
  tokenable_id: string;
  name: string;
  token: string;
  abilities?: string;
  last_used_at?: string;
  expires_at?: string;
}

export interface UpdatePersonalAccessTokenDTO extends Partial<CreatePersonalAccessTokenDTO> {
  id: string;
}

export interface PersonalAccessTokenFilter {
  tokenable_type?: string;
  tokenable_id?: string;
  name?: string;
  page?: number;
  per_page?: number;
} 