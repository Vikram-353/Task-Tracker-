import React from "react";
import { LocalStorageKey } from "../utils";
import { v4 as uuidv4 } from "uuid";

/**
 * get all tasks from localstorage
 * @return {Array} Array of task object
 */

export const getAllTasks = () => {
  try {
    const tasks = localStorage.getItem(LocalStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
};

/**
 *Save tasks array to localStorage
 * @param {Object} Saving array of tasks of object type
 */

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(LocalStorageKey, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving task.", error);
  }
};

/**
 * Create new tasks
 * @param {Object} taskData - Task Data with title and description
 * @returns {Object} taskData with ID and timestamp
 */

export const createTask = (taskData) => {
  const tasks = getAllTasks();
  const newTask = {
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

/**
 * Update Task
 * @param {string} id- Task Id to find task
 * @param {Object} updated Task
 * @returns {Object|null} Updated task or null if task not found
 
 */

export const updateTask = (id, updatedTask) => {
  const tasks = getAllTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
    return tasks[index];
  }

  return null;
};

/**
 *
 * @param {string} id-Task Id to delete
 * @returns {boolean} True if deleted successfully,false otherwise
 */

export const deleteTask = (id) => {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  if (filteredTasks.length !== tasks.length) {
    saveTasks(filteredTasks);
    return true;
  }
  return false;
};

export const toggleTaskCompletion = (id) => {
  const tasks = getAllTasks();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    return updateTask(id, { completed: !task.completed });
  }
  return null;
};
