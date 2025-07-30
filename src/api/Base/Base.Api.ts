export interface ListResponse<T> {
  statusCode: number;
  message: string;
  data: {
    result: T[];
    meta: PaginationMeta;
  };
}

export interface Reponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface QueryApi {
  page: number;
  limit: number;
  q?: string;
}

export interface ResponseApi<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  q: string;
}

export interface PaginationApi<T> {
  result: T;
  meta: PaginationMeta;
}
