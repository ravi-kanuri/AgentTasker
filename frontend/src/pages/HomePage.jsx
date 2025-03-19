import React, { useRef, useState } from 'react';
import { Plus, Menu, X, ListChecks } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AgentTable from '../components/AgentTable';
import { useDispatch,useSelector } from 'react-redux';
import { distributeTask, uploadCsv } from '../slices/csvSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { uploadLoading, distributeLoading } = useSelector((state) => state.csv);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (!allowedTypes.includes(file.type)) {
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      dispatch(uploadCsv(formData));  
      fileInputRef.current.value = '';
    }
  };

  const distributeTasksButton = () => {
    dispatch(distributeTask());
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-2xl p-4 rounded-r-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 relative overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            className="md:hidden bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
          <div className="flex gap-4">
          <button
               onClick={distributeTasksButton}
               disabled={distributeLoading}
                className={`flex items-center gap-2 px-5 py-3 ${ distributeLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} font-semibold text-white rounded-lg shadow transition`}>
            {distributeLoading ? 'Distributing...' : (
              <>
               <ListChecks size={20} /> Distribute Tasks
               </>
               )}
            </button>

            <div>
              <input
                type="file"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
             <button
                onClick={handleButtonClick}
                disabled={uploadLoading}
                className={`flex items-center gap-2 px-5 py-3 ${uploadLoading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} font-semibold text-white rounded-lg shadow transition`}>
                {uploadLoading ? 'Uploading...' : (
              <>
              <Plus size={20} /> Upload File
              </>
              )}
            </button>

            </div>
          </div>
        </div>
        <div >
          <AgentTable />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
