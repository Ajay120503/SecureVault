import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/vault" replace />;
  }

  return children;
}
