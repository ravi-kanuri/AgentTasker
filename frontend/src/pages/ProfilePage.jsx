import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {authUser}=useSelector((state)=>state.auth);

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar for large screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-lg p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Menu button for mobile */}
        <button
          className="absolute top-4 left-4 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={28} className="text-gray-700" />
        </button>

        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl space-y-8">
          {/* Profile Card */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Profile</h2>
            <div className="text-gray-700 space-y-4">
              <div>
                <p className="text-sm uppercase text-gray-500 mb-1">Name</p>
                <p className="text-xl font-semibold text-gray-800">{authUser.name}</p>
              </div>
              <div>
                <p className="text-sm uppercase text-gray-500 mb-1">Email</p>
                <p className="text-xl font-semibold text-gray-800">{authUser.email}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;