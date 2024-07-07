// client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return user ? children : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
