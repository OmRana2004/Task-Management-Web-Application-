import { motion } from "framer-motion";

const TaskCard = ({ task, onDelete, onToggle, onEdit, isDeleting, isToggling }) => {
  const done = task.status === "completed";

  return (
    <motion.div
      layout
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative rounded-2xl p-4 overflow-hidden group"
      style={{
        background: done
          ? "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: done
          ? "1px solid rgba(16,185,129,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: done
            ? "linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
        }}
      />

      {/* Status dot + badge */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2 h-2 rounded-full shrink-0 mt-0.5"
            style={{
              background: done ? "#34d399" : "#fbbf24",
              boxShadow: done ? "0 0 6px rgba(52,211,153,0.6)" : "0 0 6px rgba(251,191,36,0.6)",
            }}
          />
          <h3
            className={`text-sm font-semibold leading-snug truncate transition-all ${
              done ? "text-white/40 line-through" : "text-white"
            }`}
          >
            {task.title}
          </h3>
        </div>
        <span
          className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{
            background: done ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.12)",
            color: done ? "#34d399" : "#fbbf24",
            border: done ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(251,191,36,0.2)",
          }}
        >
          {done ? "Done" : "Pending"}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/30 text-xs leading-relaxed line-clamp-2 mb-3 min-h-[32px]">
        {task.description || "No description added."}
      </p>

      {/* Date */}
      {task.createdAt && (
        <p className="text-white/20 text-[10px] mb-3">
          {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-1.5">
        {/* Edit */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => onEdit(task)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            color: "#818cf8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(99,102,241,0.2)";
            e.currentTarget.style.color = "#a5b4fc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(99,102,241,0.1)";
            e.currentTarget.style.color = "#818cf8";
          }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            background: done ? "rgba(251,191,36,0.1)" : "rgba(52,211,153,0.1)",
            border: done ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(52,211,153,0.2)",
            color: done ? "#fbbf24" : "#34d399",
          }}
        >
          {isToggling ? (
            <span className="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
          className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.15)",
            color: "#f87171",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.08)";
          }}
        >
          {isDeleting ? (
            <span className="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin block" />
          ) : (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
