import React, { useState } from "react";
import { Mail, Lock } from "lucide-react"; 
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-black text-xl md:text-2xl font-bold mb-6 md:mb-8">
        Log in to admin account
      </h2>

      <div className="flex flex-col gap-5 w-full max-w-sm">
        {/* Email input with icon */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-12 py-3 rounded-lg bg-white text-black border-2 border-black focus:outline-none"
          />
        </div>

        {/* Password input with icon */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-12 py-3 rounded-lg bg-white text-black border-2 border-black focus:outline-none"
          />
        </div>

        <button
          className="bg-[#1E90FF] text-white text-xl font-bold py-3 w-full rounded-4xl cursor-pointer"
          onClick={handleLogin}
        >
          {isLoggingIn ? 'Logging In' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default Login;