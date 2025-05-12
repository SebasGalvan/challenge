const VITE_API_URL = import.meta.env.VITE_API_URL;

const handleErrors = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Ha ocurrido un error desconocido'
    }));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const getTasks = async (filters = {}) => {
  try {
    let url = `${VITE_API_URL}/tasks`;
  
    const queryParams = new URLSearchParams();
    
    if (filters.completed !== undefined) {
      queryParams.append('completed', filters.completed);
    }
    
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url);
    return handleErrors(response);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`);
    return handleErrors(response);
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleErrors(response);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Error al actualizar la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const toggleTaskStatus = async (id, completed) => {
  try {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    return handleErrors(response);
  } catch (error) {
    console.error(`Error al cambiar el estado de la tarea con ID ${id}:`, error);
    throw error;
  }
};