import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
