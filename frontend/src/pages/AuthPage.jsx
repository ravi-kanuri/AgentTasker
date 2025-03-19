import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1E90FF]">
      {/* Left Section */}
      <div className="w-full md:w-1/3 bg-[#1E90FF] flex flex-col justify-center items-center text-left p-8 pb-16 md:pb-0">
  
          {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Agent Tasker
        </h1>
     </div>


      {/* Right Section */}
      <div className="w-full md:w-2/3 bg-white flex justify-center items-center p-6 pb-16 md:pb-0">
        <div className="w-full max-w-sm">
          {isLogin ? <Login /> : <Signup />} 

          <button
            className="text-black text-center mt-4 ml-16 cursor-pointer hover:text-gray-500 focus:outline-none transition-colors duration-300"
            onClick={toggleForm}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;