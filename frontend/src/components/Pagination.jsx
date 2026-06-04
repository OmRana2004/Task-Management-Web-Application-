// Pagination.jsx
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex justify-center items-center gap-1.5 mt-8">
      {[
        { label: "←", action: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1 },
      ].map((btn) => (
        <motion.button key={btn.label} whileTap={{ scale: 0.9 }} disabled={btn.disabled} onClick={btn.action}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm text-slate-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white card-shadow"
          style={{ border: "1px solid #e8eaf6" }}>
          {btn.label}
        </motion.button>
      ))}

      {visible.map((page, idx) => {
        const prev = visible[idx - 1];
        return (
          <span key={page} className="flex items-center gap-1.5">
            {prev && page - prev > 1 && <span className="text-slate-300 text-xs">…</span>}
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentPage(page)}
              className="w-8 h-8 rounded-xl text-xs font-semibold transition-all duration-200"
              style={currentPage === page
                ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }
                : { background: "#fff", border: "1px solid #e8eaf6", color: "#94a3b8" }}>
              {page}
            </motion.button>
          </span>
        );
      })}

      <motion.button whileTap={{ scale: 0.9 }} disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm text-slate-400 hover:text-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white card-shadow"
        style={{ border: "1px solid #e8eaf6" }}>
        →
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
