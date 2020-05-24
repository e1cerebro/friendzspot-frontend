import React, { useState } from 'react';
import './send-message-box.style.css';
import { CHAT_API_URL } from '../../utils/api-settings';
const SendMessageBox = () => {
  const [message, setMessage] = useState('');

  const handleInputChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = async event => {
    let response = await fetch(`${CHAT_API_URL}/api/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    let result = await response.json();
    console.log(result.data);
  };
  return (
    <div
      className='row message-box'
      style={{ margin: '0', backgroundColor: ' #fff', zIndex: '1000' }}>
      <div className='input-field col s11 offset-s0'>
        <textarea
          onChange={handleInputChange}
          id='message-box'
          value={message}
          required
          className='materialize-textarea validate'></textarea>
        <i onClick={sendMessage} className='material-icons prefix send-button'>
          send
        </i>
        <label style={{ marginLeft: ' 0' }} htmlFor='message-box'>
          Start typing your message...
        </label>
      </div>
    </div>
  );
};

export default SendMessageBox;
