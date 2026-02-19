import { useEffect, useState } from "react";
import { getLogs } from "../../api/admin.api";
import toast from "react-hot-toast";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const { data } = await getLogs();
      setLogs(data);
    } catch {
      toast.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-24 gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm opacity-60">Loading security logs...</p>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            System Activity Logs
          </h1>
          <p className="text-sm opacity-60">
            Monitor authentication and security events across the platform
          </p>
        </div>

        <div className="badge badge-outline badge-primary">Audit Trail</div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden">
        <div className="max-h-150 overflow-y-scroll">
          <table className="table">
            {/* HEADER */}
            <thead className="bg-base-200/70 backdrop-blur sticky top-0 z-10">
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Role</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-14 opacity-60">
                    No activity found
                  </td>
                </tr>
              )}

              {logs.map((log) => {
                const actionColor = log.action?.toLowerCase().includes("login")
                  ? "badge-success"
                  : log.action?.toLowerCase().includes("delete")
                  ? "badge-error"
                  : log.action?.toLowerCase().includes("update")
                  ? "badge-warning"
                  : "badge-info";

                return (
                  <tr
                    key={log._id}
                    className="hover:bg-base-200/40 transition-all"
                  >
                    {/* USER */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary">
                          {log.userId?.name?.[0] || "U"}
                        </div>

                        <div>
                          <div className="font-semibold">
                            {log.userId?.name || "Unknown"}
                          </div>
                          <div className="text-xs opacity-60">
                            {log.userId?.email || "-"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td>
                      <span className={`badge line-clamp-1 ${actionColor}`}>
                        {log.action}
                      </span>
                    </td>

                    {/* IP */}
                    <td className="font-mono text-sm opacity-70">{log.ip}</td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={`badge ${
                          log.userId?.role === "admin"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {log.userId?.role || "user"}
                      </span>
                    </td>

                    {/* TIME */}
                    <td className="opacity-60 text-sm whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
