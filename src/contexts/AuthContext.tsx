import { clearUser, setUser } from "@/store/userSlice";
import type { Admin, AuthContextType } from "@/types/auth";
import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  const login = (user: Admin) => {
    dispatch(setUser(user));
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
  };
  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
