import React from 'react';
import './icon.style.css';
const Icon = ({ icon, color, className, size }) => {
  const colorValue = color ? color : '#039be5';
  return (
    <i
      className={` large material-icons friendzspot-icon  ${className}`}
      style={{
        color: colorValue,
        display: 'inline-block',
        fontSize: size ? size : '',
      }}>
      {icon}
    </i>
  );
};

export default Icon;
