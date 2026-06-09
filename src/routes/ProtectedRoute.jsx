import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const {
    user,
    loading,
  } = useAuth();

  // WAIT FOR FIREBASE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 text-2xl">
        Authenticating...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // LOGGED IN
  return children;
};

export default ProtectedRoute;