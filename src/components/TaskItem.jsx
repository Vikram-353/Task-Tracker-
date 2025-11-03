import { Check, Edit2, Trash2 } from "lucide-react";
import React from "react";

/**
 *
 * @param {Object} props - Component props
 * @param {Object} props.task- Task Object
 * @param {Function} props.onToggle - to change the task completion state
 * @param {Function} props.OnEdit - Callbackto click edit button
 * @param {Function} props.onDelete- Callback to delete task
 */

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
        task.completed
          ? "border-l-4 border-orange-900"
          : "border-l-4 border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Completion checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1  w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
              task.completed
                ? "bg-green-600 border-green-600"
                : "border-gray-300 hover:border-green-900"
            }`}
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed && <Check size={16} className="text-white" />}
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-800 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm mt-1 ${
                  task.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 ">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-orange-900 hover:bg-orange-50 rounded-lg transition"
            aria-label="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
