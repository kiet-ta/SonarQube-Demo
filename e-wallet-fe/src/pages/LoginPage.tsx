import React, { useEffect, useState, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import LoginPicture from "../assets/images/LoginPicture.webp";

interface User {
  fullName: string;
  userId: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL as string;

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLocalLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent reload page
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    // real API validation
    try {
      const data = await authApi.login({
        email: email.trim(),
        password: password.trim(),
      });
      const res = data.data;

      setUser(res);
      navigate("/homepage");
    } catch (err) {
      console.error("Login error:", err);
      setError("Thông tin đăng nhập không chính xác.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8E7] px-4">
      <div className="relative bg-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-10">
          {!user ? (
            <form onSubmit={handleLocalLogin} className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Đăng nhập
              </h2>
              <p className="text-gray-500 mb-6">
                Chào mừng bạn quay lại! Vui lòng nhập thông tin để tiếp tục.
              </p>

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-[#D4AF37]"
                  />
                  Ghi nhớ đăng nhập
                </label>

                <Link
                  to="/forgot-password"
                  className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C19A32] text-white font-semibold py-3 rounded-xl transition-all"
              >
                Đăng nhập
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-gray-400 text-sm">hoặc</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="!text-[#D4AF37] hover:underline font-medium"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p>Xin chào, {user.fullName}</p>
            </div>
          )}
        </div>

        <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-white">
          <img
            src={LoginPicture}
            alt="Hình minh họa"
            className="w-[360px] h-auto object-contain drop-shadow-md mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
