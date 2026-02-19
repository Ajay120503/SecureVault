import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar bg-base-100 shadow mb-4">
      <div className="flex-1">
        <Link to="/vault" className="btn btn-ghost text-xl">
          🔐 Vault
        </Link>
      </div>

      <button className="btn btn-error btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
