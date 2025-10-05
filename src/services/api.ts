// services/api.ts
import { ApiClient } from './http';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'https://tasksbackend.rdexperts.tech/api';
const AUTH_API_URL    = import.meta.env.VITE_AUTH_API_URL   || DEFAULT_API_URL; // can differ

export const api = {
  default: new ApiClient(DEFAULT_API_URL),
  auth:    new ApiClient(AUTH_API_URL),
};
