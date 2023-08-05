import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsAuthChecked(false);

      try {
        const response = await axios.get("/api/users/current_user", {
          withCredentials: true
        });
        setCurrentUser(response.data); // assuming the user data is directly in response.data
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      }

      setIsAuthChecked(true);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      setAuthError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const signup = async (full_name, userName, email, password) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        full_name,
        userName,
        email,
        password
      }, {
        withCredentials: true
      });
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      setAuthError(error.response?.data?.message || 'Signup failed');
      throw error;
    }
  };

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthChecked,
      authError,
      setUser,
      clearAuthError,
      login,
      signup,
      // Include logout when you implement it
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
