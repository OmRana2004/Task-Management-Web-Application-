import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SearchFilter from "../components/SearchFilter";
import TaskCard from "../components/TaskCard";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [toast, setToast] = useState(null);

  const tasksPerPage = 6;

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/get");
      setTasks(res.data.tasks || []);
    } catch {
      showToast("Failed to load tasks.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);
  useEffect(() => { setCurrentPage(1); }, [search, filter]);

  const handleSubmit = async () => {
    if (!title.trim()) return showToast("Title is required.", "error");
    setSubmitting(true);
    try {
      await API.post("/create", { title: title.trim(), description: description.trim() });
      setTitle(""); setDescription("");
      showToast("Task created!");
      fetchTasks();
    } catch { showToast("Failed to create task.", "error"); }
    finally { setSubmitting(false); }
  };

  const deleteTask = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/delete/${id}`);
      showToast("Task deleted.");
      fetchTasks();
    } catch { showToast("Failed to delete.", "error"); }
    finally { setDeletingId(null); }
  };

  const toggleStatus = async (task) => {
    setTogglingId(task._id);
    try {
      const status = task.status === "completed" ? "pending" : "completed";
      await API.patch(`/status/${task._id}`, { status });
      showToast(`Marked as ${status}.`);
      fetchTasks();
    } catch { showToast("Failed to update.", "error"); }
    finally { setTogglingId(null); }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditOpen(true);
  };

  const updateTask = async () => {
    if (!editTitle.trim()) return showToast("Title cannot be empty.", "error");
    setSubmitting(true);
    try {
      await API.put(`/update/${editingTask._id}`, {
        title: editTitle.trim(), description: editDescription.trim(),
      });
      setIsEditOpen(false); setEditingTask(null);
      showToast("Task updated!");
      fetchTasks();
    } catch { showToast("Failed to update.", "error"); }
    finally { setSubmitting(false); }
  };

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = (task.title || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  }), [tasks, search, filter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Premium mesh gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-700/6 rounded-full blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6">

        {/* Stats Row */}
        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
        >
          {[
            { title: "Total", value: tasks.length, icon: "◈", color: "violet" },
            { title: "Done", value: completedCount, icon: "◉", color: "emerald" },
            { title: "Pending", value: pendingCount, icon: "◎", color: "amber" },
            { title: "Rate", value: `${completionRate}%`, icon: "◐", color: "sky" },
          ].map((s) => (
            <motion.div key={s.title} variants={itemVariants}>
              <StatsCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Create Task */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative rounded-2xl mb-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.05) 100%)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="What needs to be done?"
                  maxLength={100}
                  className="w-full bg-white/[0.04] text-white placeholder-white/20 px-4 py-2.5 rounded-xl text-sm border border-white/[0.07] focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/20 outline-none transition-all duration-200"
                />
              </div>
              <div className="relative flex-1">
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Add a note... (optional)"
                  maxLength={300}
                  className="w-full bg-white/[0.04] text-white placeholder-white/20 px-4 py-2.5 rounded-xl text-sm border border-white/[0.07] focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/20 outline-none transition-all duration-200"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleSubmit}
                disabled={submitting || !title.trim()}
                className="relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.35)",
                }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
                Add Task
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }} className="mb-4"
        >
          <SearchFilter
            search={search} setSearch={setSearch}
            filter={filter} setFilter={setFilter}
            totalCount={filteredTasks.length}
          />
        </motion.div>

        {/* Task Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 rounded-2xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
            ))}
          </div>
        ) : paginatedTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
              {search || filter !== "all" ? "🔍" : "✦"}
            </div>
            <p className="text-white/60 text-sm">
              {search || filter !== "all" ? "No tasks match your filter." : "No tasks yet — add one above!"}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              variants={containerVariants} initial="hidden" animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {paginatedTasks.map((task) => (
                <motion.div key={task._id} variants={itemVariants} layout>
                  <TaskCard
                    task={task} onDelete={deleteTask}
                    onToggle={toggleStatus} onEdit={editTask}
                    isDeleting={deletingId === task._id}
                    isToggling={togglingId === task._id}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
            onClick={(e) => e.target === e.currentTarget && (setIsEditOpen(false), setEditingTask(null))}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #13111c, #0f0d18)",
                border: "1px solid rgba(139,92,246,0.2)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
              <div className="p-6">
                <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs">✎</span>
                  Edit Task
                </h2>
                <div className="space-y-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                    maxLength={100}
                    className="w-full bg-white/[0.04] text-white placeholder-white/20 px-4 py-2.5 rounded-xl text-sm border border-white/[0.07] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
                  />
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description (optional)"
                    maxLength={300}
                    className="w-full bg-white/[0.04] text-white placeholder-white/20 px-4 py-2.5 rounded-xl text-sm border border-white/[0.07] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all resize-none"
                  />
                </div>
                <div className="flex gap-2.5 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={updateTask}
                    disabled={submitting || !editTitle.trim()}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 0 16px rgba(124,58,237,0.3)" }}
                  >
                    {submitting
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : "Save Changes"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setIsEditOpen(false); setEditingTask(null); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
