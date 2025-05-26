import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/authSlice";

// You can adjust these to match your Tailwind config if needed
const PRIMARY = "bg-primary";
const PRIMARY_HOVER = "hover:bg-primary-dark";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logging, setLogging] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/login`,
        formData
      );

      if (response.data.success) {
        const { user_token, email, name } = response.data;
        localStorage.setItem("token", user_token);

        dispatch(
          authAction.setLoggedInUser({
            email: email,
            name: name,
            fullname: name
          })
        );

        toast.success("Login successful!");
        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
      toast.error(error.response?.data?.message || "Error during login");
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className=" mt-20 min-h-screen min-w-[700px] flex items-center justify-center  from-primary/10 to-white p-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl px-8 py-10 relative overflow-hidden">
        {/* Decorative Gradient Circle */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/20 rounded-full blur-2xl z-0"></div>
        {/* Brand Section */}
        <div className="text-center mb-10 z-10 relative">
          <h1 className="text-4xl font-extrabold tracking-wider text-primary mb-2 drop-shadow">Roshan Vastralaya</h1>
          <p className="text-xs font-semibold text-primary/70 tracking-widest">ADMIN PORTAL</p>
        </div>

        {/* Login Form */}
        <div className="space-y-8 z-10 relative">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white transition-all duration-200"
                placeholder="Enter your email"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3  border-primary/20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white transition-all duration-200"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-primary/30 rounded focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              {/* <div className="text-sm">
                <a href="#" className="text-primary hover:underline transition-colors duration-200">
                  Forgot password?
                </a>
              </div> */}
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg hover:bg-primaryHover font-semibold text-lg bg-primary ${PRIMARY_HOVER} text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${logging ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={logging}
            >
              {logging ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <span className="tracking-wider ">SIGN IN</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 z-10 relative">
          <p className="text-xs text-primary/60">
            © 2024 ELEGANCE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;