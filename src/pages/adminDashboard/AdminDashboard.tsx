import  { useState } from 'react';
import Domains from '../domains/Domains';
import Users from '../../components/users/Users';

const AdminDashboard = () => {
  const [toShow, setToShow] = useState("domains");
  console.log("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center space-x-6 mb-8">
        <button
          onClick={() => setToShow("domains")}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 
            ${toShow === "domains" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100"}`}
        >
          Domains
        </button>
        <button
          onClick={() => setToShow("users")}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 
            ${toShow === "users" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100"}`}
        >
          Users
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {toShow === "domains" ? (
          <Domains />
        ) : (
          <Users />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
