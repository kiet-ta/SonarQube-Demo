import axios, { AxiosError, AxiosInstance } from 'axios';

// Interfaces (giữ nguyên, đã chuẩn)
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  fullname: string;
  password: string
}

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  [key: string]: any;
}

const apiInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error(
      `❌ API call failed: ${error.config?.url}`,
      error.response?.status,
      error.response?.data,
    );
    return Promise.reject(error);
  },
);

class AuthApi {
  async login({ email, password }: LoginRequest): Promise<ApiResponse> {
    try {
      const response = await apiInstance.post<ApiResponse>('/tokens', {
        email,
        password,
      });
      return response.data; 
    } catch (error) {
      console.error('Error in login:', error);
      throw new Error('Login failed'); 
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse> {
    try {
      const response = await apiInstance.post<ApiResponse>('/users', userData);
      return response.data;
    } catch (err) {
      console.error('Error in register:', err);
      throw new Error('Register failed');
    }
  }
}

export default new AuthApi();