// components/atoms/Button.js
import React from 'react';
import { Button as AntButton } from 'antd';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  type = 'primary', 
  size = 'middle',
  danger = false,
  icon = null,
  onClick,
  ...props 
}) => {
  return (
    <AntButton
      type={type}
      size={size}
      danger={danger}
      icon={icon}
      onClick={onClick}
      {...props}
    >
      {children}
    </AntButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.string,
  danger: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;