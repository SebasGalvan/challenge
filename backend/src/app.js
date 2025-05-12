require('dotenv').config();
const express = require('express');
const seedTasks = require('./seeder/TaskSeeder');
const sequelize = require('./db');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const router = require('./routes/Task');

const app = express();
const PORT = process.env.PORT || 3000;
const URL_FRONT = process.env.URL_FRONT

const corsOptions = {
  origin: URL_FRONT,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tareas',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use('/api', router);

sequelize.sync({ force: true }) 
  .then(() => {
    return seedTasks();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor levantado en el puerto ${PORT}`);
      console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(error => {
    console.error('Error al inicializar la base de datos:', error);
  });
 