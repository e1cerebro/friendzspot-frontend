import React from 'react';
import Icon from '../icon/Icon';
import './notify.css';

const Notify = ({ clickBubbleAction, message, type, icon, action_title }) => {
  const clickAction = () => {
    clickBubbleAction();
  };
  return (
    <div className={`notify ${type}`}>
      <span className='message'>{message}</span>
      <a
        class={`waves-effect ${type === 'danger' ? 'blue' : 'red'} btn`}
        onClick={clickAction}>
        {action_title}
        <Icon color='#fff' className='right' icon={icon} size='20px' />
      </a>
    </div>
  );
};

export default Notify;
