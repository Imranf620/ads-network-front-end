
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

const AdminRoute = () => {
  const { user } = useAppSelector(state => state.auth);
  

  if (!user || user?.data.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default AdminRoute;
