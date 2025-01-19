import { Navigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';

export function ProtectedAdminRoute() {
  const adminUser = sessionStorage.getItem('adminUser');
  
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
} 