import React from "react";
import TaskItem from "./TaskItem";

/**
 *
 * @param {Object} Component Props
 * @param {Array} props.tasks - Array of Tasks
 * @param {Funcion} props.onToggle -Toggle the completion status
 * @param {Function} props.onEdit - Edit the tasks using this Callback function
 * @param {Function} props.onDelete - To Delete the Tasks
 */
function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  return tasks.length === 0 ? (
    <div className="bg-white rounded-sm p-4 text-center">
      <p className="text-gray-600 text-sm">Empty tasks list. Add new Tasks!</p>
    </div>
  ) : (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
