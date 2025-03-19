import React from "react";
import { PanelLeft, LogOut,UserPlus, User} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-68 h-lvh transition-all duration-300 bg-white border-r flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-5">
        <Link to="/home">
        <div className="flex items-center space-x-2 p-2 rounded-md cursor-pointer" role="button" tabIndex={0}>
        <img className="w-12 h-12" src="/logo.jpeg" alt="Logo" />
        <span className="text-2xl pl-1 font-semibold text-black">Agent Tasker</span>
        </div>
        </Link>
      </div>

     
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <Link to="/home" className="flex items-center justify-between p-3 w-full hover:bg-blue-300 rounded-md cursor-pointer" role="button" tabIndex={0} >
            <div className="flex items-center space-x-2 ml-4">
              <PanelLeft className="w-6 h-6" />
              <span className="font-medium text-lg">Dashboard</span>
            </div>
          </Link>
        </div>

        <div className="p-2">
          <Link to="/addAgent" className="flex items-center justify-between p-3 w-full hover:bg-blue-300 rounded-md cursor-pointer" role="button" tabIndex={0}  >
            <div className="flex items-center space-x-2 ml-4">
              <UserPlus className="w-6 h-6" />
              <span className="font-medium text-lg">Add Agent</span>
            </div>
          </Link>
        </div>

        <div className="p-2">
          <Link to="/profile" className="flex items-center justify-between p-3 w-full hover:bg-blue-300 rounded-md cursor-pointer" role="button" tabIndex={0} >
            <div className="flex items-center space-x- ml-4 text-lg">
              <User className="w-6 h-6 mr-2" />
              <span className="font-medium">Profile</span>
            </div>
          </Link>
        </div>

      </div>

      {/* Log Out */}
      <div className="p-4 border-t border-black space-y-2">
        <button className="w-full flex items-center justify-between p-2 hover:bg-blue-400 rounded-md cursor-pointer" role="button" tabIndex={0} onClick={handleLogout} >
          <div className="flex items-center space-x-2 ml-4">
            <LogOut className="w-7 h-7" />
            <span className="text-md font-semibold">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;