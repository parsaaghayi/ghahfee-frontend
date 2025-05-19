export interface Menu {
  id: string;
  title: string;
  type: 'page' | 'category' | 'external_link';
  page_id?: string | null;
  category_id?: string | null;
  url?: string | null;
  parent_id?: string | null;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  parent?: Menu | null;
  children?: Menu[];
  page?: any;
  category?: any;
} 