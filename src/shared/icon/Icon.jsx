import React from 'react';
import './icon.style.css';
const Icon = ({ icon, color }) => {
  const colorValue = color ? color : '#039be5';
  return (
    <i
      className='large material-icons friendzspot-icon'
      style={{ color: colorValue, display: 'inline-block' }}>
      {icon}
    </i>
  );
};

export default Icon;
