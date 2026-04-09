// ---------------------------------------------------------------------------
// AeroKodex API Client
// Base URL exposed via env var so it can be overridden in production
// ---------------------------------------------------------------------------

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

// ---- token helpers (localStorage in client, SSR-safe) --------------------

export const getAccessToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

export const getRefreshToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// ---- core fetch wrapper ---------------------------------------------------

interface FetchOptions extends RequestInit {
  auth?: boolean;
  formData?: boolean;
}

export async function apiFetch<T = unknown>(
  path: string,
  { auth = false, formData = false, ...opts }: FetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {};

  if (!formData) headers['Content-Type'] = 'application/json';

  if (auth) {
    const token = getAccessToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { ...headers, ...(opts.headers as Record<string, string>) },
  });

  if (!res.ok) {
    let errorBody: unknown;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { detail: res.statusText };
    }
    throw errorBody;
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ---- types ----------------------------------------------------------------

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  is_verified: boolean;
  profile?: { address: string; company_name: string };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  product_count?: number;
  workshop_count?: number;
}

export interface ProductVariant {
  id: number;
  variant_name: string;
  price?: string; // null for unauthenticated users
  sku?: string;
  stock: number;
}

export interface ProductImage {
  id: number;
  image: string;
  is_feature: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  technical_specs: Record<string, string>;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  related_products?: Product[];
  feature_image?: string | null;
  variant_count?: number;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  created_at: string;
  updated_at?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Workshop {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: Category;
  duration: string;
  difficulty: string;
  date: string;
  location: string;
  price?: string; // null for unauthenticated
  seats_available: number;
  total_seats: number;
  image: string | null;
  is_active: boolean;
  is_fully_booked: boolean;
}

export interface Booking {
  id: number;
  workshop: number;
  workshop_title: string;
  workshop_date: string;
  workshop_location: string;
  booked_at: string;
  payment_status: string;
}

export interface DashboardData {
  user: User;
  stats: {
    workshop_bookings: number;
    quote_requests: number;
    saved_products_wishlist: number;
  };
  documents: Array<{
    id: number;
    title: string;
    document_type: string;
    uploaded_at: string;
  }>;
}

// ---- AUTH -----------------------------------------------------------------

export const authApi = {
  register: (data: {
    email: string;
    username: string;
    phone_number?: string;
    password: string;
    password_confirm: string;
  }) =>
    apiFetch<{ message: string; email: string }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiFetch<{
      message: string;
      tokens: { access: string; refresh: string };
      user: User;
    }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyOtp: (data: { email: string; otp: string }) =>
    apiFetch<{ message: string }>('/auth/verify-otp/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resendOtp: (data: { email: string }) =>
    apiFetch<{ message: string }>('/auth/resend-otp/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  passwordReset: (data: { email: string }) =>
    apiFetch<{ message: string }>('/auth/password-reset/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  passwordResetConfirm: (data: {
    email: string;
    otp: string;
    new_password: string;
  }) =>
    apiFetch<{ message: string }>('/auth/password-reset/confirm/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refreshToken: (refresh: string) =>
    apiFetch<{ access: string }>('/auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    }),

  getProfile: () =>
    apiFetch<User>('/auth/profile/', { auth: true }),

  getDashboard: () =>
    apiFetch<DashboardData>('/auth/dashboard/', { auth: true }),
};

// ---- PRODUCTS -------------------------------------------------------------

export const productsApi = {
  getCategories: () =>
    apiFetch<Category[]>('/products/categories/'),

  getList: (params?: { category?: string; search?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set('category__slug', params.category);
    if (params?.search) qs.set('search', params.search);
    if (params?.page) qs.set('page', String(params.page));
    return apiFetch<PaginatedResponse<Product>>(
      `/products/${qs.toString() ? `?${qs}` : ''}`,
      { auth: true }
    );
  },

  getDetail: (slug: string) =>
    apiFetch<Product>(`/products/${slug}/`, { auth: true }),
};

// ---- WORKSHOPS ------------------------------------------------------------

export const workshopsApi = {
  getCategories: () =>
    apiFetch<Category[]>('/workshops/categories/'),

  getList: (params?: { category?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set('category__slug', params.category);
    if (params?.page) qs.set('page', String(params.page));
    return apiFetch<PaginatedResponse<Workshop>>(
      `/workshops/${qs.toString() ? `?${qs}` : ''}`,
      { auth: true }
    );
  },

  getDetail: (slug: string) =>
    apiFetch<Workshop>(`/workshops/${slug}/`, { auth: true }),

  book: (slug: string) =>
    apiFetch<Booking>(`/workshops/${slug}/book/`, {
      method: 'POST',
      auth: true,
      body: JSON.stringify({}),
    }),

  getUserBookings: () =>
    apiFetch<PaginatedResponse<Booking>>('/workshops/bookings/', { auth: true }),
};

// ---- INQUIRIES ------------------------------------------------------------

export const inquiriesApi = {
  contact: (data: FormData) =>
    apiFetch<{ id: string; message?: string }>('/inquiries/contact/', {
      method: 'POST',
      body: data,
      formData: true,
    }),

  quote: (data: FormData) =>
    apiFetch<{ id: string; message?: string }>('/inquiries/quote/', {
      method: 'POST',
      body: data,
      formData: true,
    }),
};
