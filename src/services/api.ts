const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || "خطا در ارتباط با سرور");
  }
  return response.json();
}

export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse<T>(response);
}

export async function post<T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

export async function put<T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse<T>(response);
}

// سرویس‌های مربوط به کاربران
export const userService = {
  getAll: () => get("/users"),
  getById: (id: number) => get(`/users/${id}`),
  create: (data: any) => post("/users", data),
  update: (id: number, data: any) => put(`/users/${id}`, data),
  delete: (id: number) => del(`/users/${id}`),
};

// سرویس‌های مربوط به محصولات
export const productService = {
  getAll: () => get("/products"),
  getById: (id: number) => get(`/products/${id}`),
  create: (data: any) => post("/products", data),
  update: (id: number, data: any) => put(`/products/${id}`, data),
  delete: (id: number) => del(`/products/${id}`),
};

// سرویس‌های مربوط به سفارشات
export const orderService = {
  getAll: () => get("/orders"),
  getById: (id: number) => get(`/orders/${id}`),
  update: (id: number, data: any) => put(`/orders/${id}`, data),
  delete: (id: number) => del(`/orders/${id}`),
};

// سرویس‌های مربوط به پست‌ها
export const postService = {
  getAll: () => get("/posts"),
  getById: (id: number) => get(`/posts/${id}`),
  create: (data: any) => post("/posts", data),
  update: (id: number, data: any) => put(`/posts/${id}`, data),
  delete: (id: number) => del(`/posts/${id}`),
};

// سرویس‌های مربوط به تنظیمات
export const settingService = {
  getAll: () => get("/settings"),
  update: (data: any) => put("/settings", data),
}; 