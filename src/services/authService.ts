// services/auth.service.ts
import { api } from './api';
import type { LoginRequest, LoginResponse } from '@/types/Auth';
import type { ApiResponse } from '@/types/ApiResponse';

export class AuthService {
  constructor(private http = api.auth) {}

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.http.post<LoginResponse>('/login', data);
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.http.post<null>('/logout');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
export const authService = new AuthService();
