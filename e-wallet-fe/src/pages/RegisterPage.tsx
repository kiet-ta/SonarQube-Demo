import React, { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterPicture from "../assets/images/LoginPicture.webp";
import authApi from "../api/authApi";
import axios from "axios";

interface Errors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = (): boolean => {
    const newErrors: Errors = {};

    if (!fullname.trim()) newErrors.fullname = "Họ và tên là bắt buộc.";

    if (!email.trim()) newErrors.email = "Email là bắt buộc.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Email không hợp lệ.";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
    if (!password) newErrors.password = "Mật khẩu là bắt buộc.";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";

    if (!confirmPassword) newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu.";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setErrors({});
    try {
      await authApi.register({
        fullname: fullname.trim(),
        email: email.trim(),
        password: password,
      });

      navigate("/"); 
      
    } catch (err) {
      console.error("Register error:", err);
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setErrors({ email: "Email này đã tồn tại." });
      } else {
        setErrors({ general: "Đăng ký thất bại. Vui lòng thử lại." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8E7] px-4">
      <div className="relative bg-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl overflow-hidden">
        {/* Form */}
        <div className="w-full lg:w-1/2 p-10">
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">Đăng ký</h2>
            <p className="text-gray-500 mb-6">
              Tạo tài khoản để bắt đầu cùng Cóc Mua Xe.
            </p>

            {/* Fullname */}
            <div>
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={`w-full border ${
                  errors.fullname ? "border-red-400" : "border-gray-300"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-300"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Error general */}
            {errors.general && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm px-4 py-2 rounded-lg text-center">
                {errors.general}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C19A32] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Đã có tài khoản?{" "}
              <Link to="/login" className="!text-[#D4AF37] hover:underline font-medium">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>

        {/* Image */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-white">
          <img
            src={RegisterPicture}
            alt="Hình minh họa Cóc Mua Xe"
            className="w-[360px] h-auto object-contain drop-shadow-md mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
