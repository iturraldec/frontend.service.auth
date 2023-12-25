import { createContext, useCallback, useContext, useMemo, useState } from "react";

const MY_AUTH_APP = 'SERVICE_AUTH_TOKEN';

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);

  const login = useCallback(async function (email, password) {
    let data = {
      'email': email,
      'password': password
    };

    let response = await fetch('http://localhost:8000/api/auth/login', {
                      method: 'POST',
                      body: JSON.stringify(data),
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
    });

    let dataResponse = await response.json();

    if(dataResponse.status === '1') {
      window.localStorage.setItem(MY_AUTH_APP, true);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated
  }), [login, logout, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}