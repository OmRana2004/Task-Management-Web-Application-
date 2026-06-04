import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-10"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft />
      </motion.button>

      <div className="flex gap-1.5">
        {showPages.map((page, idx) => {
          const prev = showPages[idx - 1];
          const showEllipsis = prev && page - prev > 1;
          return (
            <span key={page} className="flex items-center gap-1.5">
              {showEllipsis && (
                <span className="text-slate-600 px-1">…</span>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {page}
              </motion.button>
            </span>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight />
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
