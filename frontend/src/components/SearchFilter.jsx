import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Done" },
];

const SearchFilter = ({ search, setSearch, filter, setFilter, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid rgba(139,92,246,0.4)";
            e.target.style.background = "rgba(255,255,255,0.06)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid rgba(255,255,255,0.07)";
            e.target.style.background = "rgba(255,255,255,0.04)";
          }}
        />
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter pills */}
      <div
        className="flex p-1 rounded-xl gap-1"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className="relative flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
            style={{ color: filter === f.value ? "#fff" : "rgba(255,255,255,0.35)" }}
          >
            {filter === f.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-lg"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Count */}
      {totalCount !== undefined && (
        <div
          className="hidden sm:flex items-center px-3 py-2 rounded-xl text-xs text-white/30 whitespace-nowrap"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {totalCount} task{totalCount !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
