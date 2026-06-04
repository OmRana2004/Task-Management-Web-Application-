import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const TaskCard = ({
  task,
  onDelete,
  onToggle,
  onEdit,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-white text-lg font-bold">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.status === "completed"
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-400 mt-3 min-h-[50px]">
        {task.description || "No description"}
      </p>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white flex items-center justify-center gap-2"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onToggle(task)}
          className="flex-1 bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white flex items-center justify-center gap-2"
        >
          <FaCheck />
          Toggle
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="bg-red-500 hover:bg-red-600 transition p-3 rounded-lg text-white"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;