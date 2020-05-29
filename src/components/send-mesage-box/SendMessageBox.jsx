import React, { useState } from 'react';
import './send-message-box.style.css';
import { CHAT_API_URL } from '../../utils/api-settings';
import { connect } from 'react-redux';
import apiConfig from '../../api-config/config';

const SendMessageBox = ({ chattingWith, currentUser }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = async event => {
    console.log('Mmessage clicked');
    let response = await apiConfig.post('/api/messages/send', {
      message: message,
      receiverID: chattingWith.id,
      senderID: currentUser.id,
    });
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

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, null)(SendMessageBox);
