import { useEffect, useState } from "react";
import { getPasswords, deletePassword } from "../../api/password.api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Copy, Trash2, Search, Lock, Globe } from "lucide-react";

export default function Vault() {
  const [passwords, setPasswords] = useState([]);
  const [visible, setVisible] = useState({});
  const [search, setSearch] = useState("");

  /* LOAD */
  const load = async () => {
    try {
      const { data } = await getPasswords();
      setPasswords(data);
    } catch {
      toast.error("Failed to load vault");
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* DELETE */
  const remove = async (id) => {
    if (!confirm("Delete this password?")) return;
    await deletePassword(id);
    toast.success("Password deleted");
    load();
  };

  /* TOGGLE */
  const toggleVisibility = (id) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* COPY */
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  /* FILTER */
  const filtered = passwords.filter((p) =>
    p.siteName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Lock className="text-primary" />
          </div>
          Password Vault
        </h1>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-3 opacity-50" size={18} />
          <input
            placeholder="Search website..."
            className="input input-bordered rounded-full pl-11 w-80 focus:shadow-lg transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= EMPTY ================= */}
      {filtered.length === 0 && (
        <div className="text-center py-24 rounded-3xl bg-base-100 shadow-lg border border-base-300">
          <Lock size={40} className="mx-auto opacity-50 mb-3" />
          <h2 className="text-xl font-semibold">Your vault is empty</h2>
          <p className="opacity-70 mt-1">
            Import or save passwords to start securing your accounts.
          </p>
        </div>
      )}

      {/* ================= GRID ================= */}
      <div className="w-full px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="group w-full rounded-2xl bg-base-100 border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden wrap-break-word"
            >
              <div className="p-5 space-y-4">
                {/* SITE HEADER */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Globe size={18} className="text-primary" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-lg">{p.siteName}</h2>
                      <span className="text-xs opacity-60">
                        {p.category || "General"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* USERNAME */}
                <div className="bg-base-200 rounded-xl px-4 py-2 flex justify-between items-center">
                  <span className="truncate text-sm">{p.username}</span>

                  <button
                    className="opacity-60 hover:opacity-100 transition"
                    onClick={() => copy(p.username)}
                  >
                    <Copy size={16} />
                  </button>
                </div>

                {/* PASSWORD */}
                <div className="bg-base-200 rounded-xl px-4 py-2 flex justify-between items-center">
                  <span className="font-mono tracking-widest text-sm line-clamp-1">
                    {visible[p._id] ? p.password : "•••• •••• ••••"}
                  </span>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => toggleVisibility(p._id)}
                      className="hover:text-primary"
                    >
                      {visible[p._id] ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    <button
                      onClick={() => copy(p.password)}
                      className="hover:text-primary"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end pt-2">
                  <button
                    className="btn btn-error btn-circle btn-xs btn-outline gap-2"
                    onClick={() => remove(p._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
