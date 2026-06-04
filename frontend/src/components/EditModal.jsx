import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const priorities = [
  { value: "low", label: "Low", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
  { value: "medium", label: "Medium", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
  { value: "high", label: "High", color: "#ef4444", bg: "#fff1f2", border: "#fecdd3" },
];

const EditModal = ({ isOpen, task, submitting, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "medium");
    }
  }, [task]);

  const inputStyle = {
    background: "#f8f9ff",
    border: "1.5px solid #e8eaf6",
  };

  const focusStyle = (e) => {
    e.target.style.border = "1.5px solid #6366f1";
    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
  };

  const blurStyle = (e) => {
    e.target.style.border = "1.5px solid #e8eaf6";
    e.target.style.boxShadow = "none";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-white w-full max-w-md rounded-2xl overflow-hidden modal-shadow"
          >
            <div className="h-0.5" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}>
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-slate-800 font-semibold text-base">Edit Task</h2>
                  <p className="text-slate-400 text-xs">Update your task details below</p>
                </div>
                <button onClick={onClose}
                  className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    maxLength={100}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details..."
                    maxLength={300}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all resize-none"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Priority</label>
                  <div className="flex gap-2">
                    {priorities.map((p) => (
                      <motion.button
                        key={p.value}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setPriority(p.value)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={
                          priority === p.value
                            ? { background: p.bg, color: p.color, border: `1.5px solid ${p.border}` }
                            : { background: "#f8f9ff", color: "#94a3b8", border: "1.5px solid #e8eaf6" }
                        }
                      >
                        {p.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 mt-5">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSave({ title, description, priority })}
                  disabled={submitting || !title.trim()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                >
                  {submitting
                    ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    : "Save Changes"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all"
                  style={{ border: "1.5px solid #e8eaf6" }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
