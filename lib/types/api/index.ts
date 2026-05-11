export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}
export interface PaginationType {
    totalItem: number;
    page: number;

    limit: number;
    totalPage: number;
    currentPage: number;
    itemPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ApiPaginationResponse<T> extends ApiResponse<T> {
    pagination: PaginationType;
}