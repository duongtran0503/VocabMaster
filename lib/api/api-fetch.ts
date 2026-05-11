import { cookies } from 'next/headers';
const API_URL = process.env.NEXT_PUBLIC_API_URL || ``;

/**
 * Custom Error class dùng để xử lý lỗi từ API
 * Kế thừa từ Error gốc của JavaScript
 */
export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(message: string, status: number = 500, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Cấu hình cho ApiClient
 */
export interface ApiConfig {
    baseURL?: string;                    // Base URL của API (ví dụ: https://api.example.com)
    timeout?: number;                    // Thời gian timeout cho mỗi request (ms)
    headers?: Record<string, string>;    // Headers mặc định cho mọi request
    enableDevLog?: boolean;              // Bật/tắt log ở môi trường development
    authAccessTokenName?: string;        // Tên cookie chứa access token (mặc định: 'access_token')
}

/**
 * Options cho từng request
 * Kế thừa từ RequestInit của Fetch API
 */
export interface FetchOptions extends Omit<RequestInit, 'body'> {
    params?: Record<string, unknown>;    // Query parameters (?key=value)
    body?: unknown;                      // Body của request (object hoặc FormData)
    next?: {                             // Next.js Cache configuration
        revalidate?: number | false;     // Thời gian cache (ISR) - đơn vị giây
        tags?: string[];                 // Cache tags dùng để revalidate sau
    };
    timeout?: number;                    // Timeout riêng cho request này
    cache?: RequestCache;                // Cache strategy: 'force-cache', 'no-store', ...
}

class ApiClient {
    private readonly baseURL: string;
    private readonly defaultTimeout: number;
    private readonly defaultHeaders: Record<string, string>;
    private readonly enableDevLog: boolean;

    private authAcessTokenName: string;

    /**
     * Khởi tạo ApiClient
     * @param config Cấu hình cho client
     */
    constructor(config: ApiConfig = {}) {
        this.baseURL = (config.baseURL || process.env.NEXT_PUBLIC_API_URL || '')
            .replace(/\/$/, ''); // Loại bỏ dấu / ở cuối baseURL

        this.defaultTimeout = config.timeout ?? 15000;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
        this.enableDevLog = config.enableDevLog ?? process.env.NODE_ENV === 'development';
        this.authAcessTokenName = config.authAccessTokenName ?? 'access_token';
    }

    /**
     * Xây dựng URL hoàn chỉnh từ endpoint và query params
     * Sắp xếp params để đảm bảo cache key ổn định
     */
    private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
        const url = endpoint.startsWith('http')
            ? endpoint
            : `${this.baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

        if (!params) return url;

        const searchParams = new URLSearchParams();
        Object.entries(params)
            .sort(([a], [b]) => a.localeCompare(b)) // Sort để cache key nhất quán
            .forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    searchParams.append(key, String(value));
                }
            });

        return url.includes('?')
            ? `${url}&${searchParams.toString()}`
            : `${url}?${searchParams.toString()}`;
    }

    /**
     * Lấy Authorization header từ cookie (chỉ hoạt động trên Server Component / Server Action)
     */
    private async getAuthHeaders(): Promise<Record<string, string>> {
        try {
            // cookies() chỉ dùng được ở Server Component / Server Action
            const cookiesStore = await cookies();
            const token = await cookiesStore.get(this.authAcessTokenName)?.value;
            return token ? { Authorization: `Bearer ${token}` } : {};
        } catch {
            // Client-side hoặc nơi không dùng được cookies()
            return {};
        }
    }

    /**
     * Ghi log request ở môi trường development
     */
    private logRequest(
        method: string,
        url: string,
        startTime: number,
        status?: number,
        error?: unknown
    ): void {
        if (!this.enableDevLog) return;

        const duration = Date.now() - startTime;
        console.log('[API]', { method, url, status, duration })
        if (error) console.error('\x1b[31mError:\x1b[0m', error);

        console.groupEnd();
    }

    /**
     * Fetch với cơ chế timeout sử dụng AbortController
     */
    private async fetchWithTimeout(
        url: string,
        options: RequestInit,
        timeoutMs: number
    ): Promise<Response> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            return res;
        } catch (err) {
            clearTimeout(id);
            if (err instanceof DOMException && err.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }
            throw err;
        }
    }

    /**
     * Method cốt lõi xử lý tất cả các request
     */
    async request<T = unknown>(
        method: string,
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const startTime = Date.now();
        const { params, body, next, timeout, cache = "force-cache", headers: customHeaders = {}, ...restOptions } = options;

        const url = this.buildUrl(endpoint, params);
        const authHeaders = await this.getAuthHeaders();

        // Ép kiểu an toàn để tránh lỗi spread
        const headers: HeadersInit = {
            ...this.defaultHeaders,
            ...authHeaders,
            ...customHeaders,
        } as HeadersInit;

        let requestBody: BodyInit | null = null;

        if (body instanceof FormData) {
            // Xóa Content-Type khi dùng FormData (browser sẽ tự set boundary)
            if (headers instanceof Headers) {
                headers.delete('Content-Type');
            } else if (typeof headers === 'object') {
                delete (headers as Record<string, string>)['Content-Type'];
            }
            requestBody = body;
        } else if (body !== undefined && body !== null) {
            requestBody = JSON.stringify(body);
        }

        const fetchOptions: RequestInit = {
            method: method.toUpperCase(),
            headers,
            body: requestBody,
            cache: cache,
            next,
            ...restOptions,
        };

        try {
            const response = await this.fetchWithTimeout(
                url,
                fetchOptions,
                timeout ?? this.defaultTimeout
            );

            let data: T;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType?.includes('application/json')) {
                    data = await response.json();
                } else {
                    data = (await response.text()) as T;
                }
            } catch {
                data = null as T;
            }

            if (!response.ok) {
                const error = new ApiError(
                    response.statusText || `HTTP Error ${response.status}`,
                    response.status,
                    data
                );
                this.logRequest(method, url, startTime, response.status, error);
                throw error;
            }

            this.logRequest(method, url, startTime, response.status);
            return data;

        } catch (error) {
            this.logRequest(method, url, startTime, undefined, error);

            if (error instanceof ApiError) throw error;
            if (error instanceof TypeError) {
                throw new ApiError('Network error or failed to fetch', 0);
            }

            throw new ApiError('Unexpected error occurred', 500, error);
        }
    }

    // ==================== Public Methods (giống Axios) ====================
    get<T = unknown>(endpoint: string, options?: FetchOptions) {
        return this.request<T>('GET', endpoint, options);
    }

    post<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>('POST', endpoint, { ...options, body });
    }

    put<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>('PUT', endpoint, { ...options, body });
    }

    patch<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions) {
        return this.request<T>('PATCH', endpoint, { ...options, body });
    }

    delete<T = unknown>(endpoint: string, options?: FetchOptions) {
        return this.request<T>('DELETE', endpoint, options);
    }

    postForm<T = unknown>(endpoint: string, formData: FormData, options?: FetchOptions) {
        return this.request<T>('POST', endpoint, { ...options, body: formData });
    }
}

// Export instance mặc định
export const apiFetch = new ApiClient({
    baseURL: API_URL,
});

export default apiFetch;