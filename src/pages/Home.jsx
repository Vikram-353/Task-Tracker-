import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import {
  createTask,
  getAllTasks,
  toggleTaskCompletion,
  updateTask,
  deleteTask,
} from "../services/TaskService";
import { toast } from "react-toastify";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks
  useEffect(() => {
    setTasks(getAllTasks());
  }, []);

  /**
   * handles task creation and updation
   * @param {Object} taskData- Task Data containing title and description
   */

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      // Update existing task
      const updated = updateTask(editingTask.id, taskData);
      if (updated) {
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTask(null);
        toast.success("Task updated successfully.");
      }
    } else {
      // Create new task
      const newTask = createTask(taskData);
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully.");
    }
  };

  /**
   * Toggle task completion
   * @param {string} id- Task Id
   *
   */

  const handleToggleTask = (id) => {
    const updated = toggleTaskCompletion(id);
    if (updated) {
      setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
    }
  };
  /**
   * Edit tasks
   * @param {Object} task=Task object to edit
   */

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  /**
   * Delete Task
   * @param {string} id
   */

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const deleted = deleteTask(id);
      if (deleted) {
        setTasks(tasks.filter((t) => t.id !== id));
        if (editingTask && editingTask.id === id) {
          setEditingTask(null);
        }
      }
      toast.success("Task deleted successfully.");
    }
  };

  /**
   * Calcle edit
   */

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  /**
   * Filter tasks according to current selection
   * @returns {Array} Filtered Array of tasks
   */

  const getFilteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className=" relative min-h-screen bg-linear-to-br pt-28 from-gray-50 to-yellow-700 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Task Form */}

        <TaskForm
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{tasks.length}</p>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {completedCount}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-2 rounded-lg font-medium cursor-pointer transition ${
              filter === "pending"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-lg cursor-pointer font-medium transition ${
              filter === "completed"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default Home;
