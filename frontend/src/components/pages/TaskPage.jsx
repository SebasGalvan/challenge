// components/pages/TaskPage.js
import { Layout, Typography } from 'antd';
import { useTaskContext } from '../../context/TaskContext';
import TaskManager from '../organismos/TaskManager';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const TaskPage = () => {
  const { 
    tasks, 
    loading, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus,
    setFilters
  } = useTaskContext();

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Sistema de Gestión de Tareas
        </Title>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <TaskManager 
            tasks={tasks}
            loading={loading}
            onCreateTask={createTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleStatus={toggleTaskStatus}
            onFilterChange={setFilters}
          />
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        Sistema de Gestión de Tareas ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default TaskPage;