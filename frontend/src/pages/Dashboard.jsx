import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SearchFilter from "../components/SearchFilter";
import TaskCard from "../components/TaskCard";
import Pagination from "../components/Pagination";

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

  const tasksPerPage = 6;

  const fetchTasks = async () => {
    try {
      const res = await API.get("/get");

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
  if (!title.trim()) return;

  try {
    await API.post("/create", {
      title,
      description,
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

  const deleteTask = async (id) => {
    try {
      await API.delete(`/delete/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const status =
        task.status === "completed"
          ? "pending"
          : "completed";

      await API.patch(`/status/${task._id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
  setEditingTask(task);

  setEditTitle(task.title);
  setEditDescription(task.description || "");

  setIsEditOpen(true);
};

const updateTask = async () => {
  try {
    await API.put(`/update/${editingTask._id}`, {
      title: editTitle,
      description: editDescription,
    });

    setIsEditOpen(false);
    setEditingTask(null);

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = (
        task.title || ""
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : task.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [tasks, search, filter]);

  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const paginatedTasks =
    filteredTasks.slice(
      (currentPage - 1) *
        tasksPerPage,
      currentPage * tasksPerPage
    );

  const completedCount =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  const pendingCount =
    tasks.filter(
      (task) =>
        task.status === "pending"
    ).length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <StatsCard
            title="Total Tasks"
            value={tasks.length}
          />

          <StatsCard
            title="Completed"
            value={completedCount}
          />

          <StatsCard
            title="Pending"
            value={pendingCount}
          />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-slate-900 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-white text-xl font-bold mb-4">
  Create Task
</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Task Title"
              className="bg-slate-800 text-white p-3 rounded-lg"
            />

            <input
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Task Description"
              className="bg-slate-800 text-white p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
  <button
    onClick={handleSubmit}
    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-lg text-white transition"
  >
    Add Task
  </button>
</div>
</motion.div>

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {paginatedTasks.length ===
        0 ? (
          <div className="text-center py-20">
            <h2 className="text-white text-2xl font-bold">
              No Tasks Found
            </h2>

            <p className="text-gray-400 mt-2">
              Create a task to
              get started.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {paginatedTasks.map(
              (task) => (
                <TaskCard
                  key={
                    task._id
                  }
                  task={task}
                  onDelete={
                    deleteTask
                  }
                  onToggle={
                    toggleStatus
                  }
                  onEdit={
                    editTask
                  }
                />
              )
            )}
          </div>
        )}

        <Pagination
          currentPage={
            currentPage
          }
          totalPages={
            totalPages
          }
          setCurrentPage={
            setCurrentPage
          }
        />

          {isEditOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-800 shadow-2xl"
    >
      <h2 className="text-white text-2xl font-bold mb-5">
        Edit Task
      </h2>

      <input
        value={editTitle}
        onChange={(e) =>
          setEditTitle(e.target.value)
        }
        placeholder="Task Title"
        className="w-full bg-slate-800 text-white p-3 rounded-lg mb-4"
      />

      <textarea
        rows="4"
        value={editDescription}
        onChange={(e) =>
          setEditDescription(e.target.value)
        }
        placeholder="Task Description"
        className="w-full bg-slate-800 text-white p-3 rounded-lg"
      />

      <div className="flex gap-3 mt-5">
        <button
          onClick={updateTask}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={() => {
            setIsEditOpen(false);
            setEditingTask(null);
          }}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </div>
)}

      </div>
    </div>
  );
};

export default Dashboard;