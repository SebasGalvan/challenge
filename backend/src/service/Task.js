const { Op } = require('sequelize');
const TareaRepository = require('../repository/Tasks');
class TareaService {
  constructor() {
    this.tareaRepository = new TareaRepository();
  }

  async getTareaById(id) {
    try {
      const tarea = await this.tareaRepository.getById(id);
      return tarea;
    } catch (error) {
      throw error;
    }
  }

  async getAllTareas(where = {}) {
    try {
      let queryWhere = {};
      
      if (where.completed !== undefined) {
        queryWhere.completed = where.completed;
      }

      if (where[Op.or]) {
        queryWhere[Op.or] = [
          { title: { [Op.like]: `%${where[Op.or][0].title}%` } },
          { description: { [Op.like]: `%${where[Op.or][1].description}%` } }
        ];
      }

      const tareas = await this.tareaRepository.getAll({where: where});
      return tareas;
    } catch (error) {
      throw error;
    }
  }

  async saveTarea(tarea) {
    try {
      const nuevaTarea = await this.tareaRepository.save(tarea);
      return nuevaTarea;
    } catch (error) {
      throw error;
    }
  }

  async updateTarea(id, tarea) {
    try {
      const tareaActualizada = await this.tareaRepository.update(id, tarea);
      return tareaActualizada;
    } catch (error) {
      throw error;
    }
  }

  async deleteTarea(id) {
    try {
      await this.tareaRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}


module.exports = TareaService;