// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType } from "../types/AuthContextType";
import api from "../api/genericApi";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete("http://localhost:3030/auth/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("http://localhost:3030/recommendations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching recommendations: ", error);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        deleteUser,
        fetchRecommendations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
