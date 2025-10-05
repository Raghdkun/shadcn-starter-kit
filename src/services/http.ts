// services/http.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse, PaginatedApiResponse } from '@/types/ApiResponse';

export type RequestOptions = {
  baseURL?: string;               // optional per-call base URL override
  headers?: Record<string, string>;
  // add signal?: AbortSignal, timeout?: number, etc. if you need
};

function attachInterceptors(instance: AxiosInstance) {
  // Request interceptor for auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );
}

export function createAxios(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  attachInterceptors(instance);
  return instance;
}

/** Small wrapper that keeps types + per-request overrides clean */
export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = createAxios(baseURL);
  }

  /** Create a new ApiClient that shares the same setup but uses another baseURL */
  withBaseURL(baseURL: string) {
    return new ApiClient(baseURL);
  }

  /** Escape hatch for anything Axios can do */
  async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.request(config);
    return resp.data;
  }

  async get<T>(url: string, params?: object, opts?: RequestOptions): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.get(url, {
      params,
      baseURL: opts?.baseURL,        // per-call override
      headers: opts?.headers,
    });
    return resp.data;
  }

  async getPaginated<T>(url: string, params?: object, opts?: RequestOptions): Promise<PaginatedApiResponse<T>> {
    const resp: AxiosResponse<PaginatedApiResponse<T>> = await this.client.get(url, {
      params,
      baseURL: opts?.baseURL,
      headers: opts?.headers,
    });
    return resp.data;
  }

  async post<T>(url: string, data?: object, opts?: RequestOptions): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data, {
      baseURL: opts?.baseURL,
      headers: opts?.headers,
    });
    return resp.data;
  }

  async put<T>(url: string, data?: object, opts?: RequestOptions): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data, {
      baseURL: opts?.baseURL,
      headers: opts?.headers,
    });
    return resp.data;
  }

  async delete<T>(url: string, opts?: RequestOptions): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.delete(url, {
      baseURL: opts?.baseURL,
      headers: opts?.headers,
    });
    return resp.data;
  }

  async postMultipart<T>(url: string, formData: FormData, opts?: RequestOptions): Promise<ApiResponse<T>> {
    const resp: AxiosResponse<ApiResponse<T>> = await this.client.post(url, formData, {
      baseURL: opts?.baseURL,
      headers: { ...opts?.headers, 'Content-Type': 'multipart/form-data' },
    });
    return resp.data;
  }
}
