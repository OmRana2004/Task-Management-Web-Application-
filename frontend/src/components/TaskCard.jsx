import { motion } from "framer-motion";

const TaskCard = ({ task, onDelete, onToggle, onEdit, isDeleting, isToggling }) => {
  const done = task.status === "completed";

  return (
    <motion.div
      layout
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(99,102,241,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl p-4 flex flex-col"
      style={{
        border: done ? "1px solid #a7f3d0" : "1px solid #e8eaf6",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent */}
      <div
        className="h-1 -mx-4 -mt-4 mb-4 rounded-t-2xl"
        style={{
          background: done
            ? "linear-gradient(90deg, #10b981, #34d399)"
            : "linear-gradient(90deg, #6366f1, #8b5cf6)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className={`text-sm font-semibold leading-snug flex-1 ${
            done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
        <span
          className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={
            done
              ? { background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }
              : { background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }
          }
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: done ? "#10b981" : "#f59e0b" }}
          />
          {done ? "Done" : "Pending"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1 mb-3">
        {task.description || "No description added."}
      </p>

      {/* Date */}
      {task.createdAt && (
        <div className="flex items-center gap-1 mb-3">
          <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] text-gray-300">
            {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-1.5 pt-3" style={{ borderTop: "1px solid #f3f4f6" }}>
        {/* Edit */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => onEdit(task)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-indigo-500 hover:text-indigo-700"
          style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#e0e7ff"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#eef2ff"}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </motion.button>

        {/* Toggle */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => onToggle(task)}
          disabled={isToggling}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={
            done
              ? { background: "#fffbeb", border: "1px solid #fde68a", color: "#d97706" }
              : { background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669" }
          }
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          {isToggling ? (
            <span className="w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {done ? "Undo" : "Done"}
            </>
          )}
        </motion.button>

        {/* Delete */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => onDelete(task._id)}
          disabled={isDeleting}
          className="px-3 py-2 rounded-xl text-xs transition-all duration-200 text-rose-400 hover:text-rose-600"
          style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ffe4e6"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#fff1f2"}
        >
          {isDeleting ? (
            <span className="w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin block" />
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
