import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react"; 
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-black text-xl md:text-2xl font-bold mb-6 md:mb-8">
        Create admin account
      </h2>

      <div className="flex flex-col gap-5 w-full max-w-sm">
        {/* Name input with icon */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-12 py-3 rounded-lg bg-white text-black border-2 border-black focus:outline-none"
          />
        </div>

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
          onClick={handleSignup}
        >
          {isSigningUp ? 'Signing Up' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Signup;