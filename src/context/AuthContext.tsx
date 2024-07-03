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

/**Authentication context. */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that manages authentication state.
 *
 * @param {AuthProviderProps} children - ReactNode representing the children components
 * @return {ReactNode} The children components wrapped in the AuthContext.Provider
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  /** extract jwt data */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
  }, []);

  /**
   * A function that handles the login functionality.
   *
   * @param {string} token - The token to be stored and used for login
   * @return {void} No return value
   */
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    setIsLoggedIn(true);
  };

  /**
   * A function that handles the logout functionality by removing the token from localStorage,
   * setting the user to null, and updating the logged-in status to false.
   *
   * @param {void} No parameters
   * @return {void} No return value
   */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  /**
   * Deletes the user by making a DELETE request to the server.
   *
   * @return {Promise<void>} A promise that resolves when the user is successfully deleted.
   */
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

  /**
   * Fetches recommendations for a user.
   *
   * @param {string} userEmail - The email of the user.
   * @return {Promise<Array>} A promise that resolves to an array of recommendations.
   */
  const fetchRecommendations = async (userEmail: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `http://localhost:3030/api/recommendations/${encodeURIComponent(
          userEmail
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

/**
 * Custom hook that provides access to the authentication context.
 *
 * @return {AuthContextType} The authentication context object.
 * @throws {Error} If the hook is not used within an AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
