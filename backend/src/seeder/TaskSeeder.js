const Tarea = require("../models/Task");

const seedTasks = async () => {
  try {

    await Tarea.destroy({ where: {} });

    const tareasEjemplo = [
        {
            title: "Completar informe mensual",
            description: "Preparar el informe de ventas del mes de junio para la reunión directiva",
            completed: false,
            createdAt: new Date()
        },
        {
            title: "Actualizar sitio web",
            description: "Actualizar la sección de productos con las nuevas ofertas de temporada",
            completed: true,
            createdAt: new Date()
        },
        {
            title: "Reunión con cliente",
            description: "Videoconferencia con el cliente para presentar el avance del proyecto",
            completed: false,
            createdAt: new Date()
        },
        {
            title: "Revisar presupuesto",
            description: "Analizar y ajustar el presupuesto del tercer trimestre",
            completed: false,
            createdAt: new Date()
        },
        {
            title: "Mantenimiento de servidores",
            description: "Realizar el mantenimiento programado de los servidores de producción",
            completed: true,
            createdAt: new Date()
        }
    ];

    await Tarea.bulkCreate(tareasEjemplo);
    console.log('Datos de ejemplo insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos de ejemplo:', error);
  }
};

module.exports = seedTasks;