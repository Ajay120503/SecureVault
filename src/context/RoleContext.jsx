import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <RoleContext.Provider value={{ isAdmin, isUser }}>
      {children}
    </RoleContext.Provider>
  );
};
