import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onMenuClick, search, setSearch }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="shrink-0 bg-white/90 z-30 sticky top-0"
        style={{
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #f1f5f9",
          boxShadow: "0 1px 12px rgba(99,102,241,0.05)",
        }}
      >
        <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
          {/* Menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks... ⌘K"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none transition-all"
              style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
              onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
              onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notification bell */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </motion.button>

            {/* Avatar + logout */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-all hover:bg-slate-50"
              style={{ border: "1px solid #e8eaf6" }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                U
              </div>
              <span className="hidden sm:block text-xs font-medium text-slate-600">Account</span>
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Logout confirm */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="bg-white w-full max-w-xs rounded-2xl overflow-hidden modal-shadow"
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #f43f5e, #fb7185)" }} />
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>👋</div>
                <h3 className="text-slate-800 font-semibold text-sm mb-1">Sign out of TaskFlow?</h3>
                <p className="text-slate-400 text-xs mb-5">You'll need to log back in to access your workspace.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", boxShadow: "0 4px 12px rgba(244,63,94,0.3)" }}
                  >Sign out</button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 transition-all"
                    style={{ border: "1.5px solid #e8eaf6" }}
                  >Cancel</button>
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
