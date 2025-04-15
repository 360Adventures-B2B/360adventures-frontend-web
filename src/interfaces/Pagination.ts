export interface Pagination {
    curent_page: number;
    last_page: number;
    per_page: number;
    total: number;
    first_url: string;
    last_url: string;
    next_url: string | null;
    prev_url: string | null;
    path_url: string;
  }  