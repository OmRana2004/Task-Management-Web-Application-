import { motion } from "framer-motion";

const EmptyState = ({ hasFilters }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35 }}
    className="flex flex-col items-center justify-center py-16 gap-4"
  >
    {/* Illustration */}
    <div className="relative">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #eef2ff, #ede9fe)",
          border: "1px solid #c7d2fe",
          boxShadow: "0 8px 24px rgba(99,102,241,0.12)",
        }}
      >
        <svg className="w-9 h-9 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {hasFilters
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          }
        </svg>
      </div>
      {/* Floating dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ["#6366f1", "#8b5cf6", "#a78bfa"][i],
            top: ["-4px", "8px", "-8px"][i],
            right: ["-8px", "-16px", "4px"][i],
            opacity: 0.6,
          }}
        />
      ))}
    </div>

    <div className="text-center">
      <h3 className="text-slate-700 font-semibold text-base mb-1">
        {hasFilters ? "No matching tasks" : "Your workspace is empty"}
      </h3>
      <p className="text-slate-400 text-sm max-w-xs">
        {hasFilters
          ? "Try adjusting your search or filter to find what you're looking for."
          : "Create your first task above and start building momentum."}
      </p>
    </div>
  </motion.div>
);

export default EmptyState;
