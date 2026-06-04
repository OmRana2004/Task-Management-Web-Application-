import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const priorities = [
  { value: "low", label: "Low", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
  { value: "medium", label: "Medium", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
  { value: "high", label: "High", color: "#ef4444", bg: "#fff1f2", border: "#fecdd3" },
];

const TaskComposer = ({ onSubmit, submitting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    onSubmit({ title, description, priority });
    setTitle(""); setDescription(""); setPriority("medium"); setExpanded(false);
  };

  const selectedPriority = priorities.find((p) => p.value === priority);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden card-shadow transition-all duration-200"
      style={{ border: "1px solid #e8eaf6" }}
    >
      {/* Top gradient strip */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-700">New Task</span>
          <span className="text-[10px] text-slate-400 ml-auto hidden sm:block">Press Enter ↵ to add</span>
        </div>

        {/* Main input */}
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setExpanded(true)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && title.trim() && handleSubmit()}
            placeholder="What needs to be done?"
            maxLength={100}
            className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
            style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
            onFocus2={(e) => { e.target.style.border = "1.5px solid #6366f1"; }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={submitting || !title.trim()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
          >
            {submitting
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </>
            }
          </motion.button>
        </div>

        {/* Expanded area */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-3">
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description... (optional)"
                  maxLength={300}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all resize-none"
                  style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
                />

                {/* Priority selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Priority:</span>
                  <div className="flex gap-1.5">
                    {priorities.map((p) => (
                      <motion.button
                        key={p.value}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setPriority(p.value)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
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
                  <button
                    onClick={() => setExpanded(false)}
                    className="ml-auto text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Collapse ↑
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskComposer;
