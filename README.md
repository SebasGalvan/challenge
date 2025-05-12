# Gestor de tareas

Aplicacion de gestion de tareas con un backend desarrollado en Node.js/Express y un frontend en React. Permite crear, editar, eliminar y filtrar tareas con persistencia de datos usando SQLite.

## Estructura del Proyecto

```
task-manager/
├── backend/          # Servidor API Express
└── frontend/         # Aplicacion React
```

## Características

- ✅ API RESTful con Express
- ✅ Persistencia de datos con SQLite y Sequelize
- ✅ Frontend interactivo con React
- ✅ Filtros para tareas (completadas/pendientes)
- ✅ Función de búsqueda por titulo o descripcion
- ✅ Validación de formularios
- ✅ Documentación API con Swagger

## Backend

### Tecnologías

- Node.js
- Express (v5.1.0)
- SQLite3 (v5.1.7)
- Sequelize ORM (v6.37.7)
- Swagger para documentacion API

### Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| POST | `/api/tasks` | Crear una nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar una tarea existente |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |
| GET | `/api/tasks/:id` | Buscar tareas por id |
|pendiente) |

 ![Swagger](https://github.com/SebasGalvan/challenge/blob/master/img/swagger.PNG)

https://github.com/SebasGalvan/challenge/blob/master/img/swagger.PNG

### Configuración Backend

1. Navega al directorio backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```


3. Inicia el servidor en modo desarrollo:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` y la documentacion Swagger en `http://localhost:3000/api-docs`.

## Frontend

### Tecnologías

- React (v19.1.0)
- Ant Design (v5.25.0)
- Bootstrap (v5.3.6)
- React Router DOM

### Componentes Principales

- **TaskGrid(TaskList)**: Muestra la lista de tareas con opciones de filtrado y búsqueda
- **TaskCard(TaskItem)**: Muestra una tarea individual con opciones para editar
- **TaskForm**: Formulario para crear/editar tareas con validación

### Configuración Frontend

1. Navega al directorio frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con las siguientes variables:
```
VITE_API_URL=http://localhost:3000/api
```

4. Inicia la aplicación en modo desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Capturas de Pantalla

### Lista de Tareas
![Lista de Tareas](https://github.com/SebasGalvan/challenge/blob/master/img/lista_de_tareas.PNG)

La vista principal muestra todas las tareas con opciones de filtrado y búsqueda.

### Crear Tarea
![Crear Tarea](https://github.com/SebasGalvan/challenge/blob/master/img/crear_tarea.PNG)

Formulario para añadir una nueva tarea con validación de campos.

### Editar Tarea
![Editar Tarea](https://github.com/SebasGalvan/challenge/blob/master/img/editar_tarea.PNG)

Interfaz para modificar los detalles de una tarea existente.

## Modelo de Datos

### Task (Tarea)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | Identificador único |
| title | String | Título de la tarea |
| description | String | Descripción detallada |
| completed | Boolean | Estado de la tarea |
| createdAt | Date | Fecha de creación |

## Ejecución del Proyecto Completo

Para ejecutar ambos servicios simultáneamente:

1. Inicia el backend (desde el directorio principal):
```bash
cd backend && npm start
```

2. En otra terminal, inicia el frontend:
```bash
cd frontend && npm run dev
```
