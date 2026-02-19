import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user || user.role !== role) {
    return <Navigate to="/vault" />;
  }

  return children;
}
