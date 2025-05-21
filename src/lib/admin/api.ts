import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// اضافه کردن توکن به درخواست‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// مدیریت خطاها
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // اگر توکن منقضی شده باشد، کاربر را به صفحه لاگین هدایت می‌کنیم
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// داشبورد
export const getDashboardStats = () => api.get("/admin/stats");

// محصولات
export const getProducts = (params?: any) => api.get("/products", { params });
export const getProduct = (id: number) => api.get(`/products/${id}`);
export const createProduct = (data: any) => api.post("/products", data);
export const updateProduct = (id: number, data: any) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

// سفارشات
export const getOrders = (params?: any) => api.get("/orders", { params });
export const getOrder = (id: number) => api.get(`/orders/${id}`);
export const updateOrder = (id: number, data: any) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id: number) => api.delete(`/orders/${id}`);

// کاربران
export const getUsers = (params?: any) => api.get("/users", { params });
export const getUser = (id: number) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post("/users", data);
export const updateUser = (id: number, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);

// دسته‌بندی‌ها
export const getCategories = (params?: any) => api.get("/categories", { params });
export const getCategory = (id: number) => api.get(`/categories/${id}`);
export const createCategory = (data: any) => api.post("/categories", data);
export const updateCategory = (id: number, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

// تگ‌ها
export const getTags = (params?: any) => api.get("/tags", { params });
export const getTag = (id: number) => api.get(`/tags/${id}`);
export const createTag = (data: any) => api.post("/tags", data);
export const updateTag = (id: number, data: any) => api.put(`/tags/${id}`, data);
export const deleteTag = (id: number) => api.delete(`/tags/${id}`);

// پست‌ها
export const getPosts = (params?: any) => api.get("/posts", { params });
export const getPost = (id: number) => api.get(`/posts/${id}`);
export const createPost = (data: any) => api.post("/posts", data);
export const updatePost = (id: number, data: any) => api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

// نظرات
export const getReviews = (params?: any) => api.get("/reviews", { params });
export const getReview = (id: number) => api.get(`/reviews/${id}`);
export const updateReview = (id: number, data: any) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id: number) => api.delete(`/reviews/${id}`);

// تنظیمات
export const getSettings = () => api.get("/settings");
export const updateSettings = (data: any) => api.put("/settings", data);

// پروفایل
export const getProfile = () => api.get("/user");
export const updateProfile = (data: any) => api.put("/user", data);

// گزارش‌ها
export const getSalesReport = (params?: any) => api.get("/admin/stats", { params });
export const getOrdersReport = (params?: any) => api.get("/orders", { params });
export const getProductsReport = (params?: any) => api.get("/products", { params });

export default api; 