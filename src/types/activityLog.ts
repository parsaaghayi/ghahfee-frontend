export interface ActivityLog {
  id: string;
  user_id?: string;
  loggable_type: string;
  loggable_id: string;
  action: string;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  meta?: any;
  created_at?: string;
  updated_at?: string;
}

export interface CreateActivityLogDTO {
  user_id?: string;
  loggable_type: string;
  loggable_id: string;
  action: string;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  meta?: any;
}

export interface UpdateActivityLogDTO extends Partial<CreateActivityLogDTO> {
  id: string;
}

export interface ActivityLogFilter {
  user_id?: string;
  loggable_type?: string;
  action?: string;
  page?: number;
  per_page?: number;
} 