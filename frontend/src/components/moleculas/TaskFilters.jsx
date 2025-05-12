import { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Space, Button } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Option } = Select;

const TaskFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    completed: undefined
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timerId);
  }, [filters, onFilterChange]);

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleStatusChange = (value) => {
    setFilters(prev => ({
      ...prev,
      completed: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      completed: undefined
    });
    onFilterChange({
      search: '',
      completed: undefined
    });
  };

  return (
    <Row gutter={[16, 16]} className="task-filters">
      <Col xs={24} sm={12} md={8} lg={10}>
        <Input
          placeholder="Buscar por título o descripción"
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={handleSearchChange}
          allowClear
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          placeholder="Filtrar por estado"
          style={{ width: '100%' }}
          value={filters.completed}
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="true">Completadas</Option>
          <Option value="false">Pendientes</Option>
        </Select>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Space>
          <Button 
            icon={<FilterOutlined />} 
            type="primary"
            onClick={() => onFilterChange(filters)}
          >
            Filtrar
          </Button>
          <Button 
            icon={<ClearOutlined />} 
            onClick={handleClearFilters}
            title='Limpiar Filtros'
          >
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

TaskFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default TaskFilters;