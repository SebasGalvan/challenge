// App.js
import React from 'react';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/lib/locale/es_ES';
import './App.css';
import { TaskProvider } from './context/TaskContext';
import TaskPage from './components/pages/TaskPage';

function App() {
  return (
    <ConfigProvider locale={es_ES}>
      <TaskProvider>
        <TaskPage />
      </TaskProvider>
    </ConfigProvider>
  );
}

export default App;