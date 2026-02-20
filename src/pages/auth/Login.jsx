import { useState, useContext } from "react";
import { loginUser } from "../../api/auth.api";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loadUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!form.email.includes("@")) return toast.error("Enter valid email");

    if (form.password.length < 6)
      return toast.error("Password must be 6+ characters");

    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { data } = await loginUser(form);

      localStorage.setItem("token", data.token);

      // send token to extension
      if (window.chrome?.storage) {
        chrome.storage.local.set({
          token: data.token,
        });
      }

      await loadUser();

      toast.success("Login successful 🎉");

      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/vault", { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-200 to-base-300 px-4">
      {/* LOGIN CARD */}
      <form
        onSubmit={submit}
        className="card w-full max-w-md bg-base-100 shadow-2xl p-8 space-y-6 border border-base-300"
      >
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">🔐 Welcome Back</h2>
          <p className="text-sm opacity-70">
            Login to access your secure password vault
          </p>
        </div>

        {/* EMAIL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            className="input input-bordered w-full focus:input-primary transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full focus:input-primary transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* LOGIN BUTTON */}
        <button disabled={loading} className="btn btn-primary w-full text-base">
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm">
          New user?{" "}
          <Link to="/register" className="link link-primary font-semibold">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
