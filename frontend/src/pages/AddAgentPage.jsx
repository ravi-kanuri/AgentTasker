import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { addAgent } from '../slices/agentSlice';
import { useNavigate } from 'react-router-dom';

const AddAgentPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',  
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(addAgent(formData));
   navigate('/'); 
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Sidebar for large screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-64 h-full bg-white shadow-xl p-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4">
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center relative px-4">
        {/* Menu Button for Mobile */}
        <button
          className="absolute top-4 left-4 md:hidden p-2 bg-white rounded shadow-md"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg border-t-4 border-blue-600">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add New Agent</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter agent's full name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Number</label>
              <PhoneInput
                country={'us'} 
                value={formData.mobile}
                onChange={handlePhoneChange}
                containerClass="w-full mt-2"  
                inputClass="!w-full !py-3 !pl-14 !pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"  
                buttonClass="!p-2"  
                inputProps={{ name: 'mobile', required: true }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a strong password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            >
              Add Agent
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAgentPage;
