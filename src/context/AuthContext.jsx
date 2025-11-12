import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = (data) => {
    /**
     * data = { id, role, token, studentId?, teacherId? }
     */
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.role);
    localStorage.setItem("token", data.token);
    if (data.studentId) localStorage.setItem("studentId", data.studentId);
    if (data.teacherId) localStorage.setItem("teacherId", data.teacherId);

    setUser(data);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.clear();
    setUser(null);
    // Replace instead of navigate, to block browser back
    window.location.replace("/login");
  };

  const isStudent = user?.role === ROLES.STUDENT;
  const isTeacher = user?.role === ROLES.TEACHER;
  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isStudent, isTeacher, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
