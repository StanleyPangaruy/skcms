// src/components/AdminDashboard.tsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin"); // redirect to login if not logged in
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="h-screen w-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              SK Admin Dashboard
            </h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Manage your website content and settings
          </p>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/dashboard/members" 
            className="bg-white border border-gray-200 rounded-lg p-8 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Edit Members</h3>
              <p className="text-gray-600 text-sm">Manage team member profiles and information</p>
            </div>
          </Link>

          <Link 
            to="/dashboard/projects" 
            className="bg-white border border-gray-200 rounded-lg p-8 hover:border-green-300 hover:shadow-md transition-all group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Edit Projects</h3>
              <p className="text-gray-600 text-sm">Update project details and portfolio items</p>
            </div>
          </Link>

          <Link 
            to="/dashboard/reports" 
            className="bg-white border border-gray-200 rounded-lg p-8 hover:border-orange-300 hover:shadow-md transition-all group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Reports</h3>
              <p className="text-gray-600 text-sm">Add and manage document uploads</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats or Info Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Last login: Today
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              System status: Active
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              Pending updates: 0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;