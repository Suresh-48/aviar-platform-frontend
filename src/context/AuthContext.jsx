import React, { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Roles
export const ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, role, token, teacherId, studentId }
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 🔑 Login function
    const login = (data) => {
        /**
         * data = {
         *   id: string,
         *   role: "student" | "teacher" | "admin",
         *   token: string,
         *   studentId?: string,
         *   teacherId?: string
         * }
         */
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);
        if (data.studentId) localStorage.setItem("studentId", data.studentId);
        if (data.teacherId) localStorage.setItem("teacherId", data.teacherId);
    };

    // 🚪 Logout function
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("studentId");
        localStorage.removeItem("teacherId");
        setUser(null);

        // Prevent back navigation
        window.location.replace("/login");
    };


    // Role helpers
    const isStudent = user?.role === ROLES.STUDENT;
    const isTeacher = user?.role === ROLES.TEACHER;
    const isAdmin = user?.role === ROLES.ADMIN;

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isStudent,
                isTeacher,
                isAdmin,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
