import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex justify-center items-center gap-1.5 mt-6"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {visible.map((page, idx) => {
        const prev = visible[idx - 1];
        return (
          <span key={page} className="flex items-center gap-1.5">
            {prev && page - prev > 1 && (
              <span className="text-white/20 text-xs px-1">…</span>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200"
              style={
                currentPage === page
                  ? {
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff",
                      boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.35)",
                    }
              }
            >
              {page}
            </motion.button>
          </span>
        );
      })}

      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
