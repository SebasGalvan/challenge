import { Checkbox as AntCheckbox } from 'antd';
import PropTypes from 'prop-types';

const Checkbox = ({ 
  checked,
  onChange,
  children,
  ...props 
}) => {
  return (
    <AntCheckbox
      checked={checked}
      onChange={onChange}
      {...props}
    >
      {children}
    </AntCheckbox>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default Checkbox;