const TareaService = require('../service/Task');
const { Op } = require('sequelize');


class TareaController {
  constructor() {
    this.tareaService = new TareaService();
  }

  async getTareaById(id) {
    try {
      const tarea = await this.tareaService.getTareaById(id);
      return tarea;
    } catch (error) {
      throw error;
    }
  }

  async getAllTareas(req, res, filters = {}) {
    try {
      const where = {};
      
      if (filters.completed !== undefined) {
        where.completed = filters.completed === 'true';
      }

      if (filters.search) {
        where[Op.or] = [
          { title: { [Op.like]: `%${filters.search}%` } },
          { description: { [Op.like]: `%${filters.search}%` } }
        ];
      }

      const tareas = await this.tareaService.getAllTareas(where);
      res.json(tareas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener tareas' });
    }
  }

  async saveTarea(req, res) {
    try {
      const tarea = req.body;
      const nuevaTarea = await this.tareaService.saveTarea(tarea);
      res.json(nuevaTarea);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear tarea' });
    }
  }

  async updateTarea(req, res) {
    try {
      const id = req.params.id;
      const tarea = req.body;
      const tareaActualizada = await this.tareaService.updateTarea(id, tarea);
      res.json(tareaActualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar tarea' });
    }
  }

  async deleteTarea(id) {
    try {
      await this.tareaService.deleteTarea(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TareaController;