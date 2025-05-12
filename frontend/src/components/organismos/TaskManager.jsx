import { useState } from 'react';
import { Typography, Divider, Space, message, Card, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Button from '../atomos/Button';
import TaskGrid from './TaskGrid';
import TaskForm from '../moleculas/TaskForm';
import CustomModal from '../moleculas/CustomModal';
import TaskFilters from '../moleculas/TaskFilters';

const { Title } = Typography;

const TaskManager = ({ 
  tasks, 
  loading, 
  onCreateTask, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleStatus,
  onFilterChange
}) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleCreateTask = (taskData) => {
    onCreateTask(taskData).then(() => {
      setIsCreateModalVisible(false);
      message.success('Tarea creada exitosamente');
    }).catch(error => {
      message.error(`Error al crear la tarea: ${error.message}`);
    });
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditModalVisible(true);
  };

  const handleUpdateTask = (taskData) => {
    if (currentTask) {
      onUpdateTask(currentTask.id, { ...taskData }).then(() => {
        setIsEditModalVisible(false);
        setCurrentTask(null);
        message.success('Tarea actualizada exitosamente');
      }).catch(error => {
        message.error(`Error al actualizar la tarea: ${error.message}`);
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId).then(() => {
      message.success('Tarea eliminada exitosamente');
    }).catch(error => {
      message.error(`Error al eliminar la tarea: ${error.message}`);
    });
  };

  return (
    <div className="task-manager">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <FloatButton
            shape="circle"
            type="primary"
            style={{ insetInlineEnd: 94 }}
            onClick={() => setIsCreateModalVisible(true)}
            icon={<PlusOutlined />}
            tooltip="Nueva Tarea"
        />
        <Card className="filter-card" style={{ marginBottom: '20px' }}>
          <Typography.Title level={4} style={{ marginTop: '0' }}>Filtros</Typography.Title>
          <TaskFilters onFilterChange={onFilterChange} />
        </Card>
        
        <TaskGrid 
          tasks={tasks}
          loading={loading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleStatus={onToggleStatus}
        />
      </Space>

      <CustomModal
        title="Crear Nueva Tarea"
        isOpen={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      >
        <TaskForm 
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalVisible(false)}
        />
      </CustomModal>

      <CustomModal
        title="Editar Tarea"
        isOpen={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setCurrentTask(null);
        }}
      >
        {currentTask && (
          <TaskForm 
            task={currentTask}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setIsEditModalVisible(false);
              setCurrentTask(null);
            }}
            isEditing
          />
        )}
      </CustomModal>
    </div>
  );
};

TaskManager.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

TaskManager.defaultProps = {
  tasks: [],
  loading: false
};

export default TaskManager;
