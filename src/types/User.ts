import type { Role } from '@/types/Role';
import type { Permission } from '@/types/Permission';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  roles: Role[];
  permissions: Permission[];
  created_at: string;
  updated_at: string;
  avatar_url?: string | null;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roles?: string[];
  permissions?: string[];
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  roles?: string[];
  permissions?: string[];
}