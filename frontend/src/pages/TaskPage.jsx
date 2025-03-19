import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAgentTasks } from "../slices/agentSlice";

const TaskPage = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedAgent, tasks } = useSelector((state)=> state.agent);

  useEffect(()=>{
  if(selectedAgent){
    dispatch(getAgentTasks(selectedAgent._id));
  }
  },[selectedAgent])

  return (
    <div className="flex h-screen bg-gradient-to-tr from-blue-50 to-blue-100">
      {/* Sidebar for large screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-xl p-4 relative rounded-r-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 relative">
        {/* Menu button for mobile */}
        <button
          className="absolute top-4 left-4 md:hidden bg-white p-2 rounded-full shadow hover:bg-gray-100"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={28} className="text-gray-700" />
        </button>

        {/* Agent Details */}
        <div className="mb-8 text-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Agent Details</h2>
          <p className="text-gray-600 text-lg font-medium mb-1">{selectedAgent.name}</p>
          <p className="text-gray-500 mb-1">{selectedAgent.email}</p>
          <p className="text-gray-500">{selectedAgent.mobile}</p>
        </div>

        {/* Tasks Table */}
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Task List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="px-6 py-3 font-semibold">First Name</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-700 font-medium">{task.FirstName}</td>
                    <td className="px-6 py-4 text-gray-600">{task.Phone}</td>
                    <td className="px-6 py-4 text-gray-600">{task.Notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskPage;
