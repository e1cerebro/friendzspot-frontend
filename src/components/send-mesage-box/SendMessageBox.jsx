import React from 'react';
import './send-message-box.style.css';
const SendMessageBox = () => {
  return (
    <div
      class='row'
      style={{ margin: '0', backgroundColor: ' #fff', zIndex: '1000' }}>
      <div class='input-field col s11 offset-s0'>
        <textarea id='textarea1' class='materialize-textarea'></textarea>
        <i class='material-icons prefix'>send</i>
        <label style={{ marginLeft: ' 0' }} htmlFor='textarea1'>
          Start typing your message...
        </label>
      </div>
    </div>
  );
};

export default SendMessageBox;
