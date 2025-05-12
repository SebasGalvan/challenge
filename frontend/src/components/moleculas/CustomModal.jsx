// components/molecules/CustomModal.js
import React from 'react';
import { Modal as AntModal } from 'antd';
import PropTypes from 'prop-types';

const CustomModal = ({ 
  title, 
  isOpen, 
  onClose, 
  children,
  width = 520,
  ...props 
}) => {
  return (
    <AntModal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      {...props}
    >
      {children}
    </AntModal>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CustomModal;