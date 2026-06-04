import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { value: "all", label: "All Tasks" },
  { value: "pending", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const sorts = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A → Z" },
];

const SearchFilter = ({ filter, setFilter, sortBy, setSortBy, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
      {/* Filter chips */}
      <div className="flex gap-1.5 flex-wrap">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className="relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={
              filter === f.value
                ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
                : { background: "#fff", color: "#64748b", border: "1px solid #e8eaf6" }
            }
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:ml-auto">
        {/* Count */}
        <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
          {totalCount} task{totalCount !== 1 ? "s" : ""}
        </span>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-medium text-slate-600 outline-none cursor-pointer transition-all"
            style={{ background: "#fff", border: "1px solid #e8eaf6" }}
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
