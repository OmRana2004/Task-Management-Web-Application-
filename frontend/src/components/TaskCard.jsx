import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaCheck, FaClock } from "react-icons/fa";

const TaskCard = ({ task, onDelete, onToggle, onEdit, isDeleting, isToggling }) => {
  const isCompleted = task.status === "completed";

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group bg-slate-900/80 backdrop-blur border rounded-2xl p-5 shadow-lg overflow-hidden transition-colors duration-300 ${
        isCompleted ? "border-green-500/30" : "border-slate-700/60"
      }`}
    >
      {/* Status glow line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
          isCompleted
            ? "bg-gradient-to-r from-green-400 to-emerald-500"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }`}
      />

      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3
          className={`text-white text-base font-bold leading-snug line-clamp-2 transition-all ${
            isCompleted ? "line-through opacity-60" : ""
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            isCompleted
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          }`}
        >
          {isCompleted ? <FaCheck className="text-[10px]" /> : <FaClock className="text-[10px]" />}
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 min-h-[48px]">
        {task.description || "No description provided."}
      </p>

      {/* Created date */}
      {task.createdAt && (
        <p className="text-slate-600 text-xs mt-3">
          {new Date(task.createdAt).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onEdit(task)}
          className="flex-1 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 transition-all duration-200 p-2.5 rounded-xl text-blue-400 hover:text-white flex items-center justify-center gap-1.5 text-sm font-medium"
        >
          <FaEdit className="text-xs" /> Edit
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onToggle(task)}
          disabled={isToggling}
          className={`flex-1 transition-all duration-200 p-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm font-medium border ${
            isCompleted
              ? "bg-yellow-500/20 hover:bg-yellow-500 border-yellow-500/30 hover:border-yellow-500 text-yellow-400 hover:text-white"
              : "bg-green-600/20 hover:bg-green-600 border-green-500/30 hover:border-green-500 text-green-400 hover:text-white"
          }`}
        >
          {isToggling ? (
            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          ) : (
            <><FaCheck className="text-xs" /> {isCompleted ? "Undo" : "Done"}</>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onDelete(task._id)}
          disabled={isDeleting}
          className="bg-red-500/20 hover:bg-red-500 border border-red-500/30 hover:border-red-500 transition-all duration-200 p-2.5 rounded-xl text-red-400 hover:text-white"
        >
          {isDeleting ? (
            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin block" />
          ) : (
            <FaTrash className="text-xs" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
