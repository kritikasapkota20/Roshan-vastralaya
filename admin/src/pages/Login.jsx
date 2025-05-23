import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/authSlice";

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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Brand Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-2">ELEGANCE</h1>
          <p className="text-sm text-gray-500 tracking-widest">ADMIN PORTAL</p>
        </div>

        {/* Login Form */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Please sign in to continue</p>
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
                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 bg-transparent focus:outline-none transition-colors duration-200"
                placeholder="Enter your email"
                required
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
                className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 bg-transparent focus:outline-none transition-colors duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded focus:ring-gray-900"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-black text-white py-4 px-4 transition-all duration-300 ${logging ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-900"
                }`}
              disabled={logging}
            >
              {logging ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="tracking-wider">SIGN IN</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            © 2024 ELEGANCE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
