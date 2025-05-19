export type SupportTicketStatus = 'open' | 'closed' | 'pending' | 'resolved';
export type SupportTicketPriority = 'normal' | 'high' | 'urgent';

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  body: string;
  status: string;
  priority: string;
  department?: string;
  closed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSupportTicketDTO {
  user_id: string;
  subject: string;
  body: string;
  status?: string;
  priority?: string;
  department?: string;
}

export interface UpdateSupportTicketDTO extends Partial<CreateSupportTicketDTO> {
  id: string;
  closed_at?: string;
}

export interface SupportTicketFilter {
  user_id?: string;
  status?: string;
  priority?: string;
  department?: string;
  sort_by?: 'created_at' | 'status';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 