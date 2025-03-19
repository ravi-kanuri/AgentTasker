import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { getAgents, setSelectedAgent } from "../slices/agentSlice";
import { useNavigate } from "react-router-dom";

const AgentTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { agents=[] } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);
  
  const handleTasks=(agent)=>{
    let agentId=agent._id;
    dispatch(setSelectedAgent(agent));
    navigate(`/task/${agentId}`);
  };

  return (
    <div className="p-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-xl">
        <table className="w-full text-left text-base rounded-lg">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-4">Agent Name</th>
              <th className="p-4">Agent Email</th>
              <th className="p-4">Agent Mobile</th>
              <th className="p-4">Agent Tasks</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr
                key={agent._id}
                className="transition-transform duration-300 hover:scale-[1.01] hover:bg-blue-100"
              >
                <td className="p-4">{agent.name}</td>
                <td className="p-4">{agent.email}</td>
                <td className="p-4">{agent.mobile}</td>
                <td className="p-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition" onClick={() => handleTasks(agent)}
                  >
                    View Tasks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Small screen card view */}
      <div className="block md:hidden space-y-4">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="border rounded-lg shadow-md p-4 bg-blue-50 hover:bg-blue-100 transition"
          >
            <div className="mb-2">
              <strong>Agent Name: </strong> {agent.name}
            </div>
            <div className="mb-2">
              <strong>Email: </strong> {agent.email}
            </div>
            <div className="mb-2">
              <strong>Mobile: </strong> {agent.mobile}
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 mt-2 rounded-md w-full hover:bg-blue-400 transition cursor-pointer" onClick={() => handleTasks(agent)}
            >
              View Tasks
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentTable;
