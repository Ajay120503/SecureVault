import { Outlet, NavLink } from "react-router-dom";
import { ShieldCheck, KeyRound, PlusCircle, Upload, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function UserLayout() {
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
      {/* Drawer Toggle */}
      <input id="sidebar" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar (Mobile) */}
        <div className="navbar bg-base-100 shadow lg:hidden">
          <label
            htmlFor="sidebar"
            className="btn btn-square btn-ghost transition-all duration-300"
          >
            <Menu size={20} />
          </label>
          <h1 className="font-semibold text-lg tracking-tight ml-2">
            SecureVault
          </h1>
        </div>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full flex flex-col bg-base-100 border-r border-base-300 shadow-sm">
          {/* ================= LOGO ================= */}
          <div className="p-6 border-b border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  SecureVault
                </h2>
                <p className="text-xs opacity-60">Password Manager</p>
              </div>
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}
          <ul className="menu w-full px-3 py-4 space-y-2 flex-1">
            <li>
              <NavLink to="/vault" className={navClass}>
                <KeyRound size={18} />
                <span>Vault</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/add" className={navClass}>
                <PlusCircle size={18} />
                <span>Add Password</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/import" className={navClass}>
                <Upload size={18} />
                <span>Import</span>
              </NavLink>
            </li>
          </ul>

          {/* ================= USER SECTION ================= */}
          <div className="border-t border-base-300 p-4">
            <div className="flex items-center gap-3 bg-base-200 rounded-xl p-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.email}</p>
                <p className="text-xs opacity-60">Logged in</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="btn btn-error btn-sm w-full mt-3"
            >
              Logout
            </button>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="text-center text-xs opacity-60 pb-4">
            © {new Date().getFullYear()} SecureVault
          </div>
        </aside>
      </div>
    </div>
  );
}
