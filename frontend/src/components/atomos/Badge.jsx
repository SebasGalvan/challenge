import { Badge as AntBadge } from 'antd';
import PropTypes from 'prop-types';

const Badge = ({ 
  status, 
  text,
  color,
  count,
  ...props 
}) => {
  if (status) {
    return <AntBadge status={status} text={text} {...props} />;
  }
  
  if (count !== undefined) {
    return <AntBadge count={count} {...props} />;
  }
  
  return <AntBadge color={color} text={text} {...props} />;
};

Badge.propTypes = {
  status: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
};

export default Badge;