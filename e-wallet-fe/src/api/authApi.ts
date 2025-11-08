interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  token?: string;
  [key: string]: any;
}

class AuthApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = `${import.meta.env.VITE_API_BASE_URL}auth`;
  }

  async login({ email, password }: LoginRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("❌ Login API failed:", response.status, text);
        throw new Error("Login failed");
      }

      const json: ApiResponse = JSON.parse(text);
      return json;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this.apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("❌ Register API failed:", res.status, text);
        throw new Error("Register failed");
      }

      const json: ApiResponse = JSON.parse(text);
      return json;
    } catch (err) {
      console.error("Error in register:", err);
      throw err;
    }
  }
}

export default new AuthApi();
