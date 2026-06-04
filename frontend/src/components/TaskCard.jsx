import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const priorityConfig = {
  high: { label: "High", color: "#ef4444", bg: "#fff1f2", border: "#fecdd3", dot: "#ef4444" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b" },
  low: { label: "Low", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", dot: "#10b981" },
};

const TaskCard = ({ task, onDelete, onToggle, onEdit, isDeleting, isToggling }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const done = task.status === "completed";
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl flex flex-col relative group card-shadow"
      style={{
        border: done ? "1px solid #a7f3d0" : "1px solid #e8eaf6",
      }}
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Status accent bar */}
      <div
        className="h-0.5 rounded-t-2xl"
        style={{
          background: done
            ? "linear-gradient(90deg, #10b981, #34d399)"
            : "linear-gradient(90deg, #6366f1, #8b5cf6)",
        }}
      />

      <div className="p-4 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start gap-2 mb-2">
          {/* Checkbox */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onToggle(task)}
            disabled={isToggling}
            className="mt-0.5 w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
            style={{
              borderColor: done ? "#10b981" : "#c7d2fe",
              background: done ? "#10b981" : "transparent",
            }}
          >
            {isToggling ? (
              <span className="w-2.5 h-2.5 border border-current/40 border-t-current rounded-full animate-spin block" />
            ) : done ? (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
          </motion.button>

          {/* Title */}
          <h3
            className={`flex-1 text-sm font-semibold leading-snug transition-all ${
              done ? "line-through text-slate-400" : "text-slate-800"
            }`}
          >
            {task.title}
          </h3>

          {/* Context menu */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((p) => !p)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-7 z-20 bg-white rounded-xl overflow-hidden w-36"
                  style={{ border: "1px solid #e8eaf6", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                >
                  {[
                    {
                      label: "Edit", icon: (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ),
                      action: () => { onEdit(task); setMenuOpen(false); }, color: "#6366f1",
                    },
                    {
                      label: done ? "Mark Pending" : "Mark Done", icon: (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      action: () => { onToggle(task); setMenuOpen(false); }, color: "#10b981",
                    },
                    {
                      label: "Delete", icon: (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      ),
                      action: () => { onDelete(task._id); setMenuOpen(false); }, color: "#ef4444",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-50 transition-colors text-left"
                      style={{ color: item.color }}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3 ml-6">
          {task.description || "No description added."}
        </p>

        {/* Tags row */}
        <div className="flex items-center gap-1.5 ml-6 flex-wrap mb-3">
          {/* Priority badge */}
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: priority.bg, color: priority.color, border: `1px solid ${priority.border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: priority.dot }} />
            {priority.label}
          </span>

          {/* Status badge */}
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={
              done
                ? { background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }
                : { background: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe" }
            }
          >
            {done ? "Completed" : "In Progress"}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto ml-6 pt-3"
          style={{ borderTop: "1px solid #f8f9ff" }}>
          {task.createdAt ? (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px] text-slate-300">
                {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          ) : <div />}

          {/* Quick action buttons */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(task)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-indigo-400 hover:text-indigo-600 transition-colors"
              style={{ background: "#eef2ff" }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task._id)}
              disabled={isDeleting}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors"
              style={{ background: "#fff1f2" }}
            >
              {isDeleting
                ? <span className="w-2.5 h-2.5 border border-current/40 border-t-current rounded-full animate-spin block" />
                : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
              }
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
