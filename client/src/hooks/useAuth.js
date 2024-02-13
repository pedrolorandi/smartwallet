import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const NODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const sessionCheck = async () => {
      try {
        const response = await axios.get(`${NODE_BASE_URL}/session-check`, {
          withCredentials: true,
        });
        if (response.data.isAuth) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("Error verifying user:", err);
        setUser(null);
      }
    };

    sessionCheck();
  }, []);

  const login = async () => {
    const response = await axios.post(`${NODE_BASE_URL}/request`);
    window.location.href = response.data.url;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
