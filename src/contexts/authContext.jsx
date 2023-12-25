import { createContext, useCallback, useContext, useMemo, useState } from "react";

const MY_AUTH_APP = 'SERVICE_AUTH_TOKEN';

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);
  const [role, setRole]                       = useState('');

  const login = useCallback(async function (email, password, setMessage) {
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
      window.localStorage.setItem(MY_AUTH_APP, dataResponse.data.access_token);
      setIsAuthenticated(true);
    }
    else{
      setMessage('Error: Credenciales incorrectas!');
    }
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    role,
    login,
    logout
  }), [isAuthenticated, role, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}