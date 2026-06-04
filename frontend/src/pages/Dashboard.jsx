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
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
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
      showToast("Task created successfully!");
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
    <div className="min-h-screen" style={{ background: "linear-gradient(145deg, #f0f4ff 0%, #faf9ff 50%, #f5f0ff 100%)" }}>
      {/* Subtle background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #c7d2fe, transparent)" }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #ddd6fe, transparent)" }} />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6">

        {/* Stats */}
        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
        >
          {[
            { title: "Total Tasks", value: tasks.length, icon: "📋", color: "violet" },
            { title: "Completed", value: completedCount, icon: "✅", color: "emerald" },
            { title: "Pending", value: pendingCount, icon: "🕐", color: "amber" },
            { title: "Done Rate", value: `${completionRate}%`, icon: "🎯", color: "sky" },
          ].map((s) => (
            <motion.div key={s.title} variants={itemVariants}>
              <StatsCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Create Task */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
          style={{ border: "1px solid rgba(99,102,241,0.12)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <span className="text-white text-xs">+</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">New Task</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="What needs to be done?"
              maxLength={100}
              className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200"
              style={{
                background: "#f8f9ff",
                border: "1.5px solid #e8eaf6",
              }}
              onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
              onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Add a note... (optional)"
              maxLength={300}
              className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200"
              style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
              onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
              onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
            />
            <motion.button
              whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
              onClick={handleSubmit}
              disabled={submitting || !title.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
              }}
            >
              {submitting
                ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Task
                  </>
              }
            </motion.button>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mb-4">
          <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} totalCount={filteredTasks.length} />
        </motion.div>

        {/* Task Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-white animate-pulse"
                style={{ border: "1px solid #f0f0f0" }} />
            ))}
          </div>
        ) : paginatedTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-sm"
              style={{ border: "1px solid #e8eaf6" }}>
              {search || filter !== "all" ? "🔍" : "📝"}
            </div>
            <p className="text-gray-400 text-sm font-medium">
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
                    task={task} onDelete={deleteTask} onToggle={toggleStatus} onEdit={editTask}
                    isDeleting={deletingId === task._id} isToggling={togglingId === task._id}
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
            style={{ background: "rgba(15,15,35,0.45)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && (setIsEditOpen(false), setEditingTask(null))}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="bg-white w-full max-w-md rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 24px 60px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.1)" }}
            >
              {/* Modal header gradient strip */}
              <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #eef2ff, #ede9fe)" }}>
                    <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-800 font-semibold text-base">Edit Task</h2>
                    <p className="text-gray-400 text-xs">Update your task details</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Title</label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Task title"
                      maxLength={100}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                      style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
                      onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
                      onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Description</label>
                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Add more details..."
                      maxLength={300}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all resize-none"
                      style={{ background: "#f8f9ff", border: "1.5px solid #e8eaf6" }}
                      onFocus={(e) => { e.target.style.border = "1.5px solid #6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)"; }}
                      onBlur={(e) => { e.target.style.border = "1.5px solid #e8eaf6"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 mt-5">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={updateTask}
                    disabled={submitting || !editTitle.trim()}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                  >
                    {submitting
                      ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      : "Save Changes"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setIsEditOpen(false); setEditingTask(null); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all"
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

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
