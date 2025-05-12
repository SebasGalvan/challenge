const express = require('express');
const TareaController = require('../controller/Task');

const router = express.Router();

const tareaController = new TareaController();

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por id
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la tarea a buscar
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/tasks/:id', async (req, res) => {
  try {    
    const id = req.params.id;
    const tarea = await tareaController.getTareaById(id);
    return res.json(tarea);
  } catch (err) {
    console.error(err);
    if (err.message === 'Id de tarea no encontrada...') {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    return res.status(500).json({ message: 'Error al obtener tarea' });
  }
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas con filtros opcionales
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado completa/pendiente
 *         example: true
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por título o descripción
 *         example: "informe"
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener tareas"
 */
router.get('/tasks', async (req, res) => {
  try {
    const { completed, search } = req.query;
    const tareas = await tareaController.getAllTareas(req, res, { completed, search });
    res.json(tareas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Nueva tarea importante"
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la tarea
 *                 example: "Descripción detallada de la nueva tarea"
 *               completed:
 *                 type: boolean
 *                 description: Estado de completitud de la tarea
 *                 default: false
 *                 example: false
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear tarea"
 */
router.post('/tasks', async (req, res) => {
  try {
    const tarea = await tareaController.saveTarea(req,res);
    res.json(tarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título de la tarea
 *                 example: "Título actualizado"
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la tarea
 *                 example: "Descripción actualizada de la tarea"
 *               completed:
 *                 type: boolean
 *                 description: Nuevo estado de completitud
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar tarea"
 */
router.put('/tasks/:id', async (req, res) => {
  try {
    const tarea = await tareaController.updateTarea(req, res);
    res.json(tarea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la tarea a eliminar
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar tarea"
 */
router.delete('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await tareaController.deleteTarea(id);
    return res.status(200).json({ message: 'Tarea eliminada'}).send();
  } catch (err) {
    console.error(err);
    if (err.message === 'Tarea no encontrada') {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    return res.status(500).json({ message: 'Error al eliminar tarea' });
  }
});

module.exports = router;