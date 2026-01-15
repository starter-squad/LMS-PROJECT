import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Component mount হওয়ার সময় localStorage থেকে user data load করুন
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (token && id && name && email && role) {
      setUser({
        id,
        name,
        email,
        role
      });
    }
    setLoading(false);
  }, []);

  const setUserInfo = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};