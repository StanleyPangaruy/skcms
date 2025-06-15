import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AdminMembers from './components/AdminMembers.tsx';
import AdminProjects from './components/AdminProjects.tsx';
import AdminReports from './components/AdminReports.tsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/members" element={<AdminMembers />} />
        <Route path="/dashboard/projects" element={<AdminProjects />} />
        <Route path="/dashboard/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
