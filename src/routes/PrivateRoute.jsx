import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { getTickets } from '../api/tickets';

const PrivateRoute = ({ children, role }) => {
  const [responseStatus, setResponseStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const checkToken = async () => {
    const res = await getTickets(user);

    setResponseStatus(res);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (responseStatus !== 200 && !user) {
    console.log('bois');
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
