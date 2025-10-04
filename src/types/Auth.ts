// types/Auth.ts
import type { User } from '@/types/User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
