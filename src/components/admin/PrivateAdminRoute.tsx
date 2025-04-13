
import { Navigate } from 'react-router-dom';

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateAdminRouteProps) => {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateAdminRoute;
