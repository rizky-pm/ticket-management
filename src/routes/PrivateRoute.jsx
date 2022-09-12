import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PrivateRoute = ({ children, role }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PrivateRoute;
