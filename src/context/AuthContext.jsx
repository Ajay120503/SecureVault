import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const loadUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data);
    } catch {
      logout();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
