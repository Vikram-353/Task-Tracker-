import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

/**
 * TaskForm component
 * @param {Object} props- Component props
 * @param {Function} props.onSubmit - To submit the form
 * @param {Object} props.editingTask - Object of task which need to edited
 * @param {Function} props.onCancel - To Cancel the Edit task
 */
function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fill fields when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);
  console.log(editingTask);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancel();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-gray-50 shadow-sm rounded-2xl p-6 mb-4">
      <h2 className="text-lg text-amber-900 font-serif mb-4 w-full bg-orange-200 p-4  rounded-2xl">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm block font-serif text-gray-900 mb-3">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none  "
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-serif text-gray-900 mb-3"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Enter task description (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-300 outline-none transition resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex items-center gap-2 px-6 py-2 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-900 transition font-serif disabled:opacity-40"
          >
            <Plus size={20} className="text-gray-600 " />
            {editingTask ? "Update Task" : "Add New Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-700 transition font-serif"
            >
              <X size={18} className="text-orange-900" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
