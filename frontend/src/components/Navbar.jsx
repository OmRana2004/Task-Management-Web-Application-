import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-white/80"
        style={{
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
          boxShadow: "0 1px 20px rgba(99,102,241,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-base tracking-tight">
              Task<span className="text-indigo-500">Flow</span>
            </span>
            <span
              className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-indigo-600"
              style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}
            >
              PRO
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 font-medium"
              style={{ background: "#f8f9ff", border: "1px solid #e8eaf6" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live sync
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              style={{ border: "1px solid #e8eaf6" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,15,35,0.4)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="bg-white w-full max-w-xs rounded-2xl overflow-hidden text-center"
              style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #f43f5e, #fb7185)" }} />
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>
                  👋
                </div>
                <h3 className="text-gray-800 font-semibold text-sm mb-1">Sign out?</h3>
                <p className="text-gray-400 text-xs mb-5">You'll need to log back in to access your tasks.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", boxShadow: "0 4px 12px rgba(244,63,94,0.3)" }}
                  >
                    Sign out
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all"
                    style={{ border: "1.5px solid #e8eaf6" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
