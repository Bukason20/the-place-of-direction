import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/admin/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("dashboard_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const me = await authService.getMe(token);
          setUser(me);
        } catch {
          // Token is invalid or expired
          localStorage.removeItem("dashboard_token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (identifier, password) => {
    const data = await authService.login(identifier, password);
    localStorage.setItem("dashboard_token", data.jwt);
    setToken(data.jwt);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("dashboard_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
