import React, { Children, createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initialUserState =  Cookies.get("jwt") || localStorage.getItem("ChatApp");
    const [authUser, setAuthUser] = useState( initialUserState ? JSON.parse(initialUserState) : undefined);
  return (
    <div>
      <AuthContext.Provider value={[authUser, setAuthUser]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export const useAuth = () => useContext(AuthContext);
