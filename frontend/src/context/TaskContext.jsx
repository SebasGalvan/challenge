import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {   
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus } from '../service/apiService';
const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    completed: undefined
  });

  // Cargar tareas con filtros
  const fetchTasks = useCallback(async (filterParams = filters) => {
    try {
      setLoading(true);
      const data = await getTasks(filterParams);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tareas:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar tareas al montar el componente o cuando cambian los filtros
  useEffect(() => {
    fetchTasks(filters);
  }, [fetchTasks, filters]);

  // Crear tarea
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      console.error('Error al crear tarea:', err);
      throw err;
    }
  };

  // Actualizar tarea
  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (err) {
      console.error(`Error al actualizar tarea ${id}:`, err);
      throw err;
    }
  };

  // Eliminar tarea
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      return true;
    } catch (err) {
      console.error(`Error al eliminar tarea ${id}:`, err);
      throw err;
    }
  };

  // Cambiar estado de tarea (completada/pendiente)
  const handleToggleStatus = async (id, completed) => {
    try {
      const updatedTask = await toggleTaskStatus(id, completed);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
      return updatedTask;
    } catch (err) {
      console.error(`Error al cambiar estado de tarea ${id}:`, err);
      throw err;
    }
  };

  // Actualizar filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const value = {
    tasks,
    loading,
    error,
    filters,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    toggleTaskStatus: handleToggleStatus,
    refreshTasks: fetchTasks,
    setFilters: handleFilterChange
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
};