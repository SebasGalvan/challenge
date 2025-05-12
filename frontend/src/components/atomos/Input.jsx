// components/atoms/Input.js
import React from 'react';
import { Input as AntInput } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = AntInput;

const Input = ({ 
  type = 'text',
  placeholder, 
  value, 
  onChange,
  ...props 
}) => {
  if (type === 'textarea') {
    return (
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  return (
    <AntInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;