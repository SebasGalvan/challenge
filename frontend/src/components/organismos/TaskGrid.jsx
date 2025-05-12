import { Row, Col, Empty, Spin } from 'antd';
import PropTypes from 'prop-types';
import TaskCard from '../moleculas/TaskCard';


const TaskGrid = ({ 
  tasks, 
  loading, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  if (loading) {
    return (
      <div className="task-grid-loader">
        <Spin size="large" tip="Cargando tareas..." />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty
        description={
          <span>
            No se encontraron tareas
            <br />
            <small style={{ color: '#999' }}>
              Intenta cambiar los filtros o crear una nueva tarea
            </small>
          </span>
        }
      />
    );
  }

  return (
    <Row gutter={[16, 16]} className="task-grid">
      {tasks.map(task => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={task.id}>
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </Col>
      ))}
    </Row>
  );
};

TaskGrid.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ),
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
};

TaskGrid.defaultProps = {
  loading: false,
  tasks: []
};

export default TaskGrid;