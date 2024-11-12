import React, { Children, createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initialUserState =  localStorage.getItem("ChatApp")|| Cookies.get("jwt") ;
    const [authUser, setAuthUser] = useState( initialUserState ? initialUserState : undefined);
  return (
    <div>
      <AuthContext.Provider value={[authUser, setAuthUser]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export const useAuth = () => useContext(AuthContext);
