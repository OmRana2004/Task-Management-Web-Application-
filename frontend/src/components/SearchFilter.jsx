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
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm text-gray-700 placeholder-gray-400 bg-white outline-none transition-all duration-200"
          style={{ border: "1.5px solid #e8eaf6" }}
          onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
          onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
        />
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
        className="flex p-1 rounded-xl gap-1 bg-white"
        style={{ border: "1.5px solid #e8eaf6" }}
      >
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className="relative flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
            style={{ color: filter === f.value ? "#fff" : "#9ca3af" }}
          >
            {filter === f.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-lg"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Count badge */}
      {totalCount !== undefined && (
        <div
          className="hidden sm:flex items-center px-3 py-2 rounded-xl text-xs font-medium text-gray-400 whitespace-nowrap bg-white"
          style={{ border: "1.5px solid #e8eaf6" }}
        >
          {totalCount} task{totalCount !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
