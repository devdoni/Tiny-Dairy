import {createContext, useCallback, useContext, useMemo, useState} from "react";
import log from "loglevel";
import {useNavigate} from "react-router-dom";

const STORAGE_KEY = "LOGGED_IN_USER";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {

  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) return null;
    try {
      return JSON.parse(raw);

    } catch (err) {
      log.warn("[AuthProvider] useState 오류발생", err);

      return null;
    }
  });

  const login = useCallback((id, nickname) => {
    log.debug("[AuthProvider] login()");
    const loggedInUser = { id , nickname };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    log.debug("[AuthProvider] logout()");
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
    navigate("/");
  },[navigate]);

  const modifyUser = useCallback((patch) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    modifyUser,
  }), [user, login, logout, modifyUser]);

  return (
    <AuthCtx.Provider value={value}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);