import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin.api";
import toast from "react-hot-toast";
import { Users, ShieldCheck, Crown, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const { data } = await getAdminStats();
      setStats(data);
    } catch {
      toast.error("Failed to load admin stats");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats)
    return (
      <div className="flex flex-col items-center justify-center mt-24 gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm opacity-60">Loading dashboard analytics...</p>
      </div>
    );

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Verified Users",
      value: stats.verifiedUsers,
      icon: <ShieldCheck size={28} />,
      color: "text-success bg-success/10",
    },
    {
      title: "Admins",
      value: stats.admins,
      icon: <Crown size={28} />,
      color: "text-warning bg-warning/10",
    },
    {
      title: "Total Activities",
      value: stats.totalLogs,
      icon: <Activity size={28} />,
      color: "text-secondary bg-secondary/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm opacity-60">
            Overview of platform activity and system usage
          </p>
        </div>

        <div className="badge badge-primary gap-2 p-3">
          <Activity size={14} />
          Live Statistics
        </div>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="
            relative overflow-hidden
            bg-base-100 border border-base-300
            rounded-2xl p-6
            shadow-sm
          "
          >
            {/* subtle background glow */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-10 rounded-full bg-primary blur-2xl"></div>

            <div className="flex items-center justify-between">
              {/* TEXT */}
              <div>
                <p className="text-sm opacity-60">{c.title}</p>
                <h2 className="text-4xl font-extrabold mt-2 tracking-tight">
                  {c.value}
                </h2>
              </div>

              {/* ICON */}
              <div
                className={`p-4 rounded-2xl flex items-center justify-center ${c.color}`}
              >
                {c.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
