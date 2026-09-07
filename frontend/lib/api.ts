/**
 * WTF University API Client
 * Connects Next.js Frontend to FastAPI Backend
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'coach' | 'institution' | 'admin' | string;
  organization?: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  full_name: string;
  role: string;
  organization?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

const TOKEN_KEY = 'wtf_auth_token';
const USER_KEY = 'wtf_auth_user';

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },
  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data?.detail || res.statusText || 'An unexpected error occurred';
    throw new Error(errorMsg);
  }

  return data as T;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const data = await apiRequest<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    tokenStorage.set(data.access_token);
    tokenStorage.setUser(data.user);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<User> => {
    return apiRequest<User>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        password: payload.password || 'TemporaryPass123!',
      }),
    });
  },

  getMe: async (): Promise<User> => {
    return apiRequest<User>('/api/v1/auth/me');
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  logout: () => {
    tokenStorage.remove();
  },
};

