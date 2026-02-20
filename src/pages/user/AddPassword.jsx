import { useState } from "react";
import { addPassword } from "../../api/password.api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Copy, RefreshCw, Lock } from "lucide-react";

export default function AddPassword() {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    siteName: "",
    username: "",
    password: "",
  });

  /* ================= PASSWORD STRENGTH ================= */
  const getStrength = (pwd) => {
    if (pwd.length < 6) return { text: "Weak", color: "bg-error" };
    if (pwd.length < 10) return { text: "Medium", color: "bg-warning" };
    return { text: "Strong", color: "bg-success" };
  };

  const strength = getStrength(form.password);

  /* ================= GENERATE PASSWORD ================= */
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 14; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }

    setForm({ ...form, password: pwd });
    toast.success("Strong password generated");
  };

  /* ================= COPY ================= */
  const copyPassword = () => {
    navigator.clipboard.writeText(form.password);
    toast.success("Password copied");
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    if (!form.siteName || !form.username || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      await addPassword(form);
      toast.success("Password saved securely 🔐");

      // reset form
      setForm({
        siteName: "",
        username: "",
        password: "",
      });
    } catch(err) {
      toast.error(err?.response?.data?.message || "Failed to save password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-xl bg-base-100 shadow-2xl rounded-2xl p-8 space-y-6 border border-base-300 transition-all duration-300"
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-4 pb-4 border-b border-base-300">
          <div className="bg-primary/10 text-primary p-3 rounded-2xl">
            <Lock size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Add New Password
            </h2>
            <p className="text-sm opacity-60">Store credentials securely</p>
          </div>
        </div>

        {/* ================= WEBSITE ================= */}
        <div>
          <label className="text-sm font-medium mb-1 block">Website</label>
          <input
            value={form.siteName}
            className="input input-bordered w-full focus:input-primary transition-all"
            placeholder="example.com"
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          />
        </div>

        {/* ================= USERNAME ================= */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Username / Email
          </label>
          <input
            value={form.username}
            className="input input-bordered w-full focus:input-primary transition-all"
            placeholder="user@email.com"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        {/* ================= PASSWORD ================= */}
        <div>
          <label className="text-sm font-medium mb-1 block">Password</label>

          <div className="flex gap-2">
            <input
              type={show ? "text" : "password"}
              value={form.password}
              className="input input-bordered w-full focus:input-primary transition-all"
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              className="btn btn-outline border-base-300"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* ================= STRENGTH ================= */}
          {form.password && (
            <div className="mt-3 space-y-1">
              <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                <div
                  className={`h-2 transition-all duration-300 rounded-full ${strength.color}`}
                  style={{
                    width:
                      strength.text === "Weak"
                        ? "33%"
                        : strength.text === "Medium"
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
              <p className="text-xs opacity-70">
                Strength: <span className="font-medium">{strength.text}</span>
              </p>
            </div>
          )}
        </div>

        {/* ================= ACTION BAR ================= */}
        <div className="flex items-center justify-between bg-base-200 rounded-xl p-3">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-ghost gap-2"
              onClick={generatePassword}
            >
              <RefreshCw size={16} />
              Generate
            </button>

            <button
              type="button"
              className="btn btn-sm btn-ghost gap-2"
              onClick={copyPassword}
            >
              <Copy size={16} />
              Copy
            </button>
          </div>

          <span className="text-xs opacity-60 line-clamp-1">
            14 characters recommended
          </span>
        </div>

        {/* ================= SUBMIT ================= */}
        <button className="btn btn-primary w-full h-11 text-base font-semibold">
          Save Password
        </button>
      </form>
    </div>
  );
}
