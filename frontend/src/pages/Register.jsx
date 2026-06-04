import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const FloatingIcon = ({ style, children }) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute flex items-center justify-center rounded-2xl text-xl select-none pointer-events-none"
    style={style}
  >
    {children}
  </motion.div>
);

const inputCls = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all
  bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400
  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
  dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200
  dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20`;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      return setError("All fields are required.");
    }
    if (form.password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    setLoading(true);
    try {
      await API.post("/signup", {
        username: form.username,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f0f4ff 0%, #faf9ff 50%, #f5f0ff 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #c7d2fe, transparent)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #ddd6fe, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e0e7ff, transparent)" }} />
      </div>

      {/* Floating background icons */}
      <FloatingIcon style={{ top: "8%", left: "6%", width: 52, height: 52, background: "#eef2ff", border: "1px solid #c7d2fe", color: "#6366f1", animationDelay: "0s" }}>
        ✓
      </FloatingIcon>
      <FloatingIcon style={{ top: "15%", right: "8%", width: 44, height: 44, background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#10b981", animationDelay: "0.5s" }}>
        📋
      </FloatingIcon>
      <FloatingIcon style={{ top: "45%", left: "3%", width: 40, height: 40, background: "#fffbeb", border: "1px solid #fde68a", color: "#f59e0b", animationDelay: "1s" }}>
        ⭐
      </FloatingIcon>
      <FloatingIcon style={{ bottom: "20%", left: "8%", width: 48, height: 48, background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0ea5e9", animationDelay: "1.5s" }}>
        🎯
      </FloatingIcon>
      <FloatingIcon style={{ bottom: "12%", right: "6%", width: 44, height: 44, background: "#fdf4ff", border: "1px solid #e9d5ff", color: "#a855f7", animationDelay: "0.8s" }}>
        ✦
      </FloatingIcon>
      <FloatingIcon style={{ top: "65%", right: "5%", width: 40, height: 40, background: "#fff1f2", border: "1px solid #fecdd3", color: "#f43f5e", animationDelay: "1.2s" }}>
        🔥
      </FloatingIcon>
      <FloatingIcon style={{ top: "30%", left: "10%", width: 36, height: 36, background: "#eef2ff", border: "1px solid #c7d2fe", color: "#6366f1", animationDelay: "2s" }}>
        ◈
      </FloatingIcon>
      <FloatingIcon style={{ bottom: "35%", right: "10%", width: 36, height: 36, background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#10b981", animationDelay: "0.3s" }}>
        ◉
      </FloatingIcon>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 24px 60px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.08)" }}
        >
          {/* Top gradient strip */}
          <div className="h-1 w-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

          <div className="p-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-base tracking-tight">
                  Task<span className="text-indigo-500">Flow</span>
                </p>
                <p className="text-[10px] text-slate-400">Premium workspace</p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create account</h1>
              <p className="text-sm text-slate-400 mt-1">Start managing tasks like a pro</p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="mb-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-600"
                  style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Username */}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Username</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    onChange={handleChange}
                    value={form.username}
                    className={inputCls + " pl-10"}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Password</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Min. 6 characters"
                    onChange={handleChange}
                    value={form.password}
                    className={inputCls + " pl-10 pr-10"}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPass
                      ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                }}
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating account...</>
                  : <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </>
                }
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[11px] text-slate-400 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Trusted by teams who get things done ✦
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
