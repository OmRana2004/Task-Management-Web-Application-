import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SearchFilter from "../components/SearchFilter";
import TaskCard from "../components/TaskCard";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import TaskComposer from "../components/TaskComposer";
import EditModal from "../components/EditModal";
import EmptyState from "../components/EmptyState";

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  const tasksPerPage = 6;

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
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
  useEffect(() => { setCurrentPage(1); }, [search, filter, sortBy]);

  const handleCreate = async ({ title, description, priority }) => {
    if (!title.trim()) return showToast("Title is required.", "error");
    setSubmitting(true);
    try {
      await API.post("/create", { title: title.trim(), description: description.trim(), priority });
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

  const editTask = (task) => { setEditingTask(task); setIsEditOpen(true); };

  const updateTask = async ({ title, description }) => {
    if (!title.trim()) return showToast("Title cannot be empty.", "error");
    setSubmitting(true);
    try {
      await API.put(`/update/${editingTask._id}`, { title: title.trim(), description: description.trim() });
      setIsEditOpen(false); setEditingTask(null);
      showToast("Task updated!");
      fetchTasks();
    } catch { showToast("Failed to update.", "error"); }
    finally { setSubmitting(false); }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesSearch = (task.title || "").toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || task.status === filter;
      return matchesSearch && matchesFilter;
    });
    if (sortBy === "newest") result = [...result].reverse();
    if (sortBy === "oldest") result = [...result];
    if (sortBy === "az") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [tasks, search, filter, sortBy]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const productivityScore = Math.min(100, completionRate + (tasks.length > 5 ? 10 : 0));

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F8F9FF", fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        mobileOpen={sidebarMobileOpen}
        onMobileClose={() => setSidebarMobileOpen(false)}
        stats={{ total: tasks.length, completed: completedCount, pending: pendingCount }}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuClick={() => {
            if (window.innerWidth < 768) setSidebarMobileOpen(true);
            else setSidebarOpen((p) => !p);
          }}
          search={search}
          setSearch={setSearch}
        />

        <main className="flex-1 overflow-y-auto">
          <motion.div
            variants={pageVariants} initial="hidden" animate="visible"
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
          >
            {/* Page header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Workspace</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-600"
                style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
            </div>

            {/* Stats */}
            <motion.div
              variants={containerVariants} initial="hidden" animate="visible"
              className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6"
            >
              {[
                { title: "Total Tasks", value: tasks.length, icon: "📋", color: "violet", trend: "+12%", trendUp: true, sub: "this week" },
                { title: "Completed", value: completedCount, icon: "✅", color: "emerald", trend: "+8%", trendUp: true, sub: "vs last week" },
                { title: "In Progress", value: pendingCount, icon: "⏳", color: "amber", trend: "-3%", trendUp: false, sub: "vs last week" },
                { title: "Productivity", value: `${productivityScore}%`, icon: "🎯", color: "sky", trend: "+5%", trendUp: true, sub: "score" },
              ].map((s) => (
                <motion.div key={s.title} variants={itemVariants}>
                  <StatsCard {...s} />
                </motion.div>
              ))}
            </motion.div>

            {/* Task Composer */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.4 }} className="mb-6"
            >
              <TaskComposer onSubmit={handleCreate} submitting={submitting} />
            </motion.div>

            {/* Search & Filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} className="mb-5"
            >
              <SearchFilter
                filter={filter} setFilter={setFilter}
                sortBy={sortBy} setSortBy={setSortBy}
                totalCount={filteredTasks.length}
              />
            </motion.div>

            {/* Task Grid */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="h-44 rounded-2xl bg-white animate-pulse"
                    style={{ border: "1px solid #f1f5f9" }}
                  />
                ))}
              </div>
            ) : paginatedTasks.length === 0 ? (
              <EmptyState hasFilters={!!(search || filter !== "all")} />
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants} initial="hidden" animate="visible"
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {paginatedTasks.map((task) => (
                    <motion.div key={task._id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.95 }}>
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
          </motion.div>
        </main>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditOpen}
        task={editingTask}
        submitting={submitting}
        onSave={updateTask}
        onClose={() => { setIsEditOpen(false); setEditingTask(null); }}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
