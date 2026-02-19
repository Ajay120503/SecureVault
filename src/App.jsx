import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import PublicRoute from "./routes/PublicRoute";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";

import Vault from "./pages/user/Vault";
import AddPassword from "./pages/user/AddPassword";
import ImportPasswords from "./pages/user/ImportPasswords";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Logs from "./pages/admin/Logs";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/verify"
            element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            }
          />

          {/* ================= USER ROUTES ================= */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/vault" />} />
            <Route path="vault" element={<Vault />} />
            <Route path="add" element={<AddPassword />} />
            <Route path="import" element={<ImportPasswords />} />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleRoute role="admin">
                  <AdminLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="logs" element={<Logs />} />
          </Route>

          {/* ✅ FALLBACK ROUTE */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
