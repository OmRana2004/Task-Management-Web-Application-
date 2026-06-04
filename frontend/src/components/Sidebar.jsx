import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Dashboard", filter: "all",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    label: "All Tasks", filter: "all",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  },
  {
    label: "In Progress", filter: "pending",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    label: "Completed", filter: "completed",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

const Sidebar = ({ isOpen, mobileOpen, onMobileClose, stats, filter, setFilter }) => {
  const completionPct = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3
        border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">
            Task<span className="text-indigo-500">Flow</span>
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2
          text-slate-400 dark:text-slate-600">
          Navigation
        </p>

        {navItems.map((item) => {
          const isActive = item.label !== "Dashboard" && filter === item.filter;
          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setFilter(item.filter); onMobileClose?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800"
                  : "text-slate-600 border border-transparent hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <span className={isActive ? "text-indigo-500" : "text-slate-400 dark:text-slate-600"}>
                {item.icon}
              </span>
              {item.label}

              {item.filter === "pending" && stats.pending > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  text-amber-600 bg-amber-50 border border-amber-200
                  dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-400">
                  {stats.pending}
                </span>
              )}
              {item.filter === "completed" && stats.completed > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  text-emerald-600 bg-emerald-50 border border-emerald-200
                  dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-400">
                  {stats.completed}
                </span>
              )}
            </motion.button>
          );
        })}

        {/* Progress */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3
            text-slate-400 dark:text-slate-600">
            Progress
          </p>
          <div className="px-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Completion</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{completionPct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400 dark:text-slate-600">{stats.completed} done</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-600">{stats.total} total</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="hidden md:flex flex-col shrink-0 overflow-hidden sidebar-shadow
              bg-white border-r border-slate-100
              dark:bg-slate-900 dark:border-slate-800"
          >
            <div style={{ width: 240 }}>
              <SidebarContent />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 overflow-y-auto sidebar-shadow md:hidden
                bg-white dark:bg-slate-900"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
