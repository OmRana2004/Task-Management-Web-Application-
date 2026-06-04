import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const filters = [
  { value: "all", label: "All", emoji: "📋" },
  { value: "pending", label: "Pending", emoji: "⏳" },
  { value: "completed", label: "Completed", emoji: "✅" },
];

const SearchFilter = ({ search, setSearch, filter, setFilter, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/80 text-white placeholder-slate-500 pl-10 pr-10 py-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
        />
        {search && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <FiX />
          </motion.button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 bg-slate-900/80 border border-slate-700 rounded-xl p-1">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className={`relative flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 justify-center ${
              filter === f.value
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {filter === f.value && (
              <motion.div
                layoutId="filterPill"
                className="absolute inset-0 bg-indigo-600 rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.emoji}</span>
            <span className="relative z-10 hidden sm:inline">{f.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Count badge */}
      {totalCount !== undefined && (
        <div className="hidden sm:flex items-center px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-400 text-sm whitespace-nowrap">
          {totalCount} task{totalCount !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
