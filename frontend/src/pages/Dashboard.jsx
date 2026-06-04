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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/get");
      setTasks(res.data.tasks || []);
    } catch (error) {
      showToast("Failed to load tasks. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast("Task title is required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await API.post("/create", { title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      showToast("Task created successfully!");
      fetchTasks();
    } catch (error) {
      showToast("Failed to create task.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleSubmit();
  };

  const deleteTask = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/delete/${id}`);
      showToast("Task deleted.");
      fetchTasks();
    } catch (error) {
      showToast("Failed to delete task.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (task) => {
    setTogglingId(task._id);
    try {
      const status = task.status === "completed" ? "pending" : "completed";
      await API.patch(`/status/${task._id}`, { status });
      showToast(`Marked as ${status}.`);
      fetchTasks();
    } catch (error) {
      showToast("Failed to update status.", "error");
    } finally {
      setTogglingId(null);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditOpen(true);
  };

  const updateTask = async () => {
    if (!editTitle.trim()) {
      showToast("Title cannot be empty.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await API.put(`/update/${editingTask._id}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditOpen(false);
      setEditingTask(null);
      showToast("Task updated!");
      fetchTasks();
    } catch (error) {
      showToast("Failed to update task.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = (task.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : task.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completionRate = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navbar />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <StatsCard title="Total Tasks" value={tasks.length} icon="📋" color="indigo" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard title="Completed" value={completedCount} icon="✅" color="green" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard title="Pending" value={pendingCount} icon="⏳" color="yellow" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard title="Done Rate" value={`${completionRate}%`} icon="🎯" color="purple" />
          </motion.div>
        </motion.div>

        {/* Create Task */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-slate-700/50 shadow-2xl overflow-hidden"
        >
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <h2 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
            <span className="text-2xl">✨</span> Create New Task
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="relative group">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task title..."
                maxLength={100}
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 p-3 pl-4 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200"
              />
              <span className="absolute right-3 top-3 text-xs text-slate-600">
                {title.length}/100
              </span>
            </div>

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Description (optional)..."
              maxLength={300}
              className="w-full bg-slate-800/80 text-white placeholder-slate-500 p-3 pl-4 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleSubmit}
              disabled={submitting || !title.trim()}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <span className="text-lg">+</span> Add Task
                </>
              )}
            </motion.button>

            {(title || description) && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => { setTitle(""); setDescription(""); }}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Clear
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SearchFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            totalCount={filteredTasks.length}
          />
        </motion.div>

        {/* Task Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 animate-pulse h-48"
                />
              ))}
            </div>
          ) : paginatedTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 flex flex-col items-center gap-4"
            >
              <span className="text-6xl">🗂️</span>
              <h2 className="text-white text-2xl font-bold">No Tasks Found</h2>
              <p className="text-slate-400 max-w-xs">
                {search || filter !== "all"
                  ? "Try adjusting your search or filter."
                  : "Create your first task above to get started!"}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {paginatedTasks.map((task) => (
                  <motion.div key={task._id} variants={itemVariants} layout>
                    <TaskCard
                      task={task}
                      onDelete={deleteTask}
                      onToggle={toggleStatus}
                      onEdit={editTask}
                      isDeleting={deletingId === task._id}
                      isToggling={togglingId === task._id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsEditOpen(false);
                setEditingTask(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <h2 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
                <span>✏️</span> Edit Task
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task Title"
                    maxLength={100}
                    className="w-full bg-slate-800 text-white placeholder-slate-500 p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-600">
                    {editTitle.length}/100
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Task Description (optional)"
                  maxLength={300}
                  className="w-full bg-slate-800 text-white placeholder-slate-500 p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 mt-5">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={updateTask}
                  disabled={submitting || !editTitle.trim()}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "Save Changes"}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setIsEditOpen(false); setEditingTask(null); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
