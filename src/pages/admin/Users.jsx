import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/admin.api";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const removeUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User removed");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-24 gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm opacity-60">Loading users...</p>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm opacity-60">
            Manage platform users and access roles
          </p>
        </div>

        <div className="badge badge-outline badge-primary">
          {users.length} Users
        </div>
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-scroll">
          <table className="table">
            <thead className="bg-base-200/70 sticky top-0">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-14 opacity-60">
                    No users found
                  </td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u._id} className="hover:bg-base-200/40 transition-all">
                  {/* USER */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
                        {u.name?.[0] || "U"}
                      </div>

                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-xs opacity-60">
                          ID: {u._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="opacity-80">{u.email}</td>

                  {/* ROLE */}
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin" ? "badge-warning" : "badge-info"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="text-right">
                    <button
                      onClick={() => removeUser(u._id)}
                      disabled={u.role === "admin"}
                      className={`btn btn-xs btn-circle btn-error btn-outline hover:btn-error 
      ${u.role === "admin" ? "opacity-50 cursor-not-allowed" : ""}
    `}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
