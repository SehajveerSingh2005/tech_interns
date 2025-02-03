import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserFirstName(token);
    }
  }, []);

  const fetchUserFirstName = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/firstname`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFirstName(response.data.firstname);
    } catch (error) {
      console.error('Error fetching user first name:', error);
      setIsLoggedIn(false);
      setFirstName('');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setFirstName('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, firstName, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;