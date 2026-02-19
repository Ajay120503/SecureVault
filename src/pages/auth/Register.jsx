import { useState } from "react";
import { registerUser } from "../../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerUser(form);

      localStorage.setItem("verifyEmail", form.email);

      toast.success("OTP sent to your email");
      navigate("/verify");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-200 to-base-300 p-4">
      <form
        onSubmit={submit}
        className="card w-full max-w-md bg-base-100 shadow-2xl p-8 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-sm opacity-70 mt-1">
            Register to secure your password vault
          </p>
        </div>

        {/* Name */}
        <div className="form-control">
          <label className="label font-semibold">Full Name</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            className="input input-bordered w-full focus:input-primary"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label font-semibold">Email Address</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full focus:input-primary"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            required
            placeholder="Minimum 6 characters"
            className="input input-bordered w-full focus:input-primary"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <button disabled={loading} className="btn btn-primary w-full mt-2">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Send OTP"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="link link-primary font-semibold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
