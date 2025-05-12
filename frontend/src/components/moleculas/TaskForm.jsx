import { Form, Space } from 'antd';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import Input from '../atomos/Input';
import Checkbox from '../atomos/Checkbox';
import Button from '../atomos/Button';

const TaskForm = ({ 
  task, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false
      });
      form.setFieldsValue({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false
      });
    }
  }, [task, form]);

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        onSubmit(values);
        if (!isEditing) {
          resetForm();
        }
      })
      .catch((error) => {
        console.error('Error en la validación del formulario:', error);
      });
  };

  const resetForm = () => {
    form.resetFields();
    setFormValues({
      title: '',
      description: '',
      completed: false
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formValues}
    >
      <Form.Item
        name="title"
        label="Título"
        rules={[{ required: true, message: 'Por favor ingresa un titulo' }]}
      >
        <Input 
          placeholder="Ingrese el título de la tarea" 
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true, message: 'Por favor ingresa una descripcion...' }]}
      >
        <Input 
          type="textarea" 
          placeholder="Ingresa la descripcion de la tarea" 
          rows={4}
        />
      </Form.Item>

      {isEditing && (
        <Form.Item
          name="completed"
          valuePropName="checked"
        >
          <Checkbox>Marcar como realizada</Checkbox>
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            {isEditing ? 'Actualizar' : 'Crear'} Tarea
          </Button>
          {onCancel && (
            <Button onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isEditing: PropTypes.bool
};

export default TaskForm;