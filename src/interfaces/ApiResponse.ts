interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  first_url: string;
  last_url: string;
  next_url: string | null;
  prev_url: string | null;
  path_url: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  pagination?: Pagination;
}
