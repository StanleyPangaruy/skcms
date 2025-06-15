import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminReports = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin');
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Reports</h2>
      <p className="text-gray-600">Upload PDF or Excel transparency files.</p>
    </div>
  );
};

export default AdminReports;
