export interface Notification {
  id: string;
  title: string;
  message: string;
  images?: string[];
  link?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateNotificationDTO {
  title: string;
  message: string;
  images?: string[];
  link?: string;
  is_active?: boolean;
}

export interface UpdateNotificationDTO extends Partial<CreateNotificationDTO> {
  id: string;
}

export interface NotificationFilter {
  search?: string;
  is_active?: boolean;
  sort_by?: 'created_at' | 'title';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 