import {createContext, useCallback, useContext, useMemo, useState} from "react";
import log from "loglevel";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    return sessionStorage.getItem("LOGGED_IN_SESSION_ID");
  });

  const login = useCallback((id) => {
    log.debug("[AuthProvider] login()");
    sessionStorage.setItem("LOGGED_IN_SESSION_ID", id);
    setUser(id);
  }, []);

  const logout = useCallback(() => {
    log.debug("[AuthProvider] logout()");
    sessionStorage.removeItem("LOGGED_IN_SESSION_ID");
    setUser(null);
  },[]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }), [user, login, logout]);

  return (
    <AuthCtx.Provider value={value}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);