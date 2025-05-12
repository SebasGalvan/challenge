const Tarea = require('../models/Task');

class TareaRepository {  
  
  async getById(id) {
    try {
      const tarea = await Tarea.findByPk(id)
      if (!tarea) {
        throw new Error('Id de tarea no encontrada...');
      }
      return tarea;
    } catch (error) {
      throw error;
    }
  }

  async getAll(where) {
    try {
      const tareas = await Tarea.findAll(where);
      return tareas;
    } catch (error) {
      throw error;
    }
  }

  async save(tarea) {
    try {
      const nuevaTarea = await Tarea.create(tarea);
      return nuevaTarea;
    } catch (error) {
      throw error;
    }
  }

  async update(id, tarea) {
    try {
      const tareaExistente = await this.getById(id);
      if (!tareaExistente) {
        throw new Error('Tarea no encontrada');
      }
      await tareaExistente.update(tarea);
      return tareaExistente;
    } catch (error) {
      throw error;
    }
  }
  
  async delete(id) {
    try {
      
      const tareaExistente = await this.getById(id);
      if (!tareaExistente) {
        throw new Error('Tarea no encontrada');
      }
      await tareaExistente.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TareaRepository;