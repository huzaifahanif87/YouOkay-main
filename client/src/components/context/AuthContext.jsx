// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for initial load

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password);
      setUser(user);
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const { user } = await authService.getCurrentUser();
      setUser(user);
    } catch (err) {
      console.error("Error refreshing user:", err);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService.setAuthHeader(token);
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading, deleteAccount: authService.deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
