import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  Menu,
} from "lucide-react";
import { useContext } from "react";

export default function AdminLayout() {
  const { logout, user } = useContext(AuthContext);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
   ${
     isActive
       ? "bg-primary text-primary-content shadow-sm scale-[1.02]"
       : "hover:bg-base-200"
   }`;

  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow px-4">
          <label
            htmlFor="admin-sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <Menu size={20} />
          </label>

          <h1 className="font-semibold text-xl tracking-tight ml-2">
            Admin Dashboard
          </h1>

          <div className="ml-auto flex items-center gap-3">
            <div className="badge badge-primary gap-1">
              <ShieldCheck size={14} />
              Admin
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="admin-sidebar" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full flex flex-col bg-base-100 border-r border-base-300 shadow-sm">
          {/* ================= BRANDING ================= */}
          <div className="p-6 border-b border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  SecureVault
                </h2>
                <p className="text-xs opacity-60">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}
          <ul className="menu w-full px-3 py-4 space-y-2 flex-1">
            <li>
              <NavLink to="/admin" end className={navClass}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/users" className={navClass}>
                <Users size={18} />
                <span>User Management</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/logs" className={navClass}>
                <FileText size={18} />
                <span>Security Logs</span>
              </NavLink>
            </li>
          </ul>

          {/* ================= ADMIN PROFILE ================= */}
          <div className="border-t border-base-300 p-4">
            <div className="flex items-center gap-3 bg-base-200 rounded-xl p-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.email}</p>
                <p className="text-xs opacity-60">Administrator</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="btn btn-error btn-sm w-full mt-3"
            >
              Logout
            </button>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="text-center text-xs opacity-60 pb-4">
            © {new Date().getFullYear()} SecureVault Admin
          </div>
        </aside>
      </div>
    </div>
  );
}
