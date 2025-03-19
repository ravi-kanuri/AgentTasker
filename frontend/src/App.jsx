import { Routes, Route,Navigate  } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage';
import AddAgentPage from './pages/AddAgentPage';
import ProfilePage from './pages/ProfilePage';
import TaskPage from './pages/TaskPage';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {checkAuth} from './slices/authSlice';
import { Loader } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth, authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center bg-white h-screen">
      <Loader className="w-15 h-15 animate-spin text-blue-500" />
    </div>
    );

  return (
    <div>
    <Routes>
    <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/Auth" />} />
      <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
      <Route path="/home" element={ authUser ? <HomePage /> : <Navigate to="/Auth" />} />
      <Route path="/addAgent" element={ authUser ? <AddAgentPage /> : <Navigate to="/Auth" />} />
      <Route path="/task/:id" element={ authUser ?<TaskPage/> : <Navigate to="/Auth"/>} />
      <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/Auth" />} />
      <Route path="*" element={<Navigate to="/Auth" />} />
    </Routes>

    <Toaster />
</div>
  )
}

export default App
