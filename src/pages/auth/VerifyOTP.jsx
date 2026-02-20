import { useState } from "react";
import { verifyOTP } from "../../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const email = localStorage.getItem("verifyEmail");

      await verifyOTP({
        email,
        otp,
      });

      toast.success("Account verified successfully");

      // cleanup
      localStorage.removeItem("verifyEmail");

      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
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
          <h2 className="text-3xl font-bold">Verify OTP</h2>
          <p className="text-sm opacity-70">Enter the OTP sent to your email</p>
          <p className="text-sm opacity-70 mt-1">
            Enter the OTP sent to{" "}
            <strong>{localStorage.getItem("verifyEmail")}</strong>
          </p>
        </div>

        {/* OTP Input */}
        <div className="form-control">
          <label className="label font-semibold">One-Time Password</label>
          <input
            type="text"
            required
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="input input-bordered text-center w-full tracking-widest text-lg focus:input-success"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* Verify Button */}
        <button disabled={loading} className="btn btn-success w-full">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Verify Account"
          )}
        </button>

        {/* Helper text */}
        <p className="text-xs text-center opacity-60">
          Didn’t receive OTP? Check spam folder.
        </p>
      </form>
    </div>
  );
}
