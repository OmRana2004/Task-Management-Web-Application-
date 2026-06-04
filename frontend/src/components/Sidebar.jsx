import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: "Dashboard", filter: "all",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    label: "All Tasks", filter: "all",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "In Progress", filter: "pending",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Completed", filter: "completed",
  },
];

const Sidebar = ({ isOpen, mobileOpen, onMobileClose, stats, filter, setFilter }) => {
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <span className="font-bold text-slate-800 text-sm tracking-tight">
            Task<span className="text-indigo-500">Flow</span>
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-semibold text-indigo-600 px-1.5 py-0.5 rounded-full"
              style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}>PRO</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Navigation</p>
        {navItems.map((item) => {
          const active = filter === item.filter && item.label !== "Dashboard";
          const isDashboard = item.label === "Dashboard";
          const isActive = isDashboard ? false : active;

          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setFilter(item.filter); if (onMobileClose) onMobileClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
              style={
                isActive
                  ? { background: "linear-gradient(135deg, #eef2ff, #ede9fe)", color: "#4f46e5", border: "1px solid #c7d2fe" }
                  : { color: "#64748b", border: "1px solid transparent" }
              }
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: isActive ? "#6366f1" : "#94a3b8" }}>{item.icon}</span>
              {item.label}
              {item.filter === "pending" && stats.pending > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full text-amber-600"
                  style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                  {stats.pending}
                </span>
              )}
              {item.filter === "completed" && stats.completed > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full text-emerald-600"
                  style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                  {stats.completed}
                </span>
              )}
            </motion.button>
          );
        })}

        {/* Progress section */}
        <div className="mt-6 pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">Progress</p>
          <div className="px-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-500 font-medium">Completion</span>
              <span className="text-xs font-bold text-indigo-600">
                {stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#e8eaf6" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400">{stats.completed} done</span>
              <span className="text-[10px] text-slate-400">{stats.total} total</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid #f1f5f9" }}>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="hidden md:flex flex-col shrink-0 overflow-hidden bg-white sidebar-shadow"
            style={{ borderRight: "1px solid #f1f5f9" }}
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
              style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 bg-white md:hidden overflow-y-auto sidebar-shadow"
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
