import { Card, Typography, Space, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateUtils';
import Button from '../atomos/Button';

const { Title, Paragraph, Text } = Typography;

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete,
  onToggleStatus, 
}) => {
  const { id, title, description, completed, createdAt } = task;
  
  return (
     <Badge.Ribbon
      color={completed ? 'green' : 'volcano'} 
      text={completed ? 'Completada' : 'Pendiente'} 
    >
      <Card 
        className="task-card"
        hoverable
        actions={[
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(task)}
          >
            Editar
          </Button>,
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(id)}
          >
            Eliminar
          </Button>,
          <Button 
            type="text" 
            onClick={() => onToggleStatus(id, !completed)}
          >
            {completed ? 'Reabrir' : 'Finalizar'}
          </Button>
        ]}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space>
            <Title level={4} className='mt-3'>{title}</Title>
          </Space>
          <div className="description-container">
            <Paragraph className="task-description">{description}</Paragraph>
          </div>
          <Text type="secondary" className='mt-2'>Creada: {formatDate(createdAt)}</Text>
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
};

export default TaskCard;