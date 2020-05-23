import React from 'react';
import './message.style.css';

const Message = ({ sender = '' }) => {
  return (
    <div class={`chat-msg   ${sender}`}>
      <div class='chat-msg-content'>
        <div class='chat-msg-text'>
          Tincidunt arcu non sodales😂{' '}
          <small class='chat-msg-date'>Message sent 2.50pm</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
