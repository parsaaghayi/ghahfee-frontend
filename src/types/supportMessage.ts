export interface SupportMessage {
  id: string;
  support_ticket_id: string;
  user_id: string;
  message: string;
  attachment?: string;
  is_admin: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSupportMessageDTO {
  support_ticket_id: string;
  user_id: string;
  message: string;
  attachment?: string;
  is_admin?: boolean;
}

export interface UpdateSupportMessageDTO extends Partial<CreateSupportMessageDTO> {
  id: string;
}

export interface SupportMessageFilter {
  support_ticket_id?: string;
  user_id?: string;
  is_admin?: boolean;
  page?: number;
  per_page?: number;
} 