import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin');
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Projects</h2>
      <p className="text-gray-600">Manage SK projects by category here.</p>
    </div>
  );
};

export default AdminProjects;
