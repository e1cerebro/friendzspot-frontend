import React, { useState, useRef } from 'react';
import './send-message-box.style.css';
import { CHAT_API_URL } from '../../utils/api-settings';
import { connect } from 'react-redux';
import apiConfig from '../../api-config/config';

const SendMessageBox = ({ chattingWith, currentUser }) => {
  const [message, setMessage] = useState('');

  const messageBoxRef = useRef(null);

  const handleInputChange = event => {
    if (event.keyCode === 13) {
      setMessage('');
    } else {
      setMessage(event.target.value);
    }
  };

  const sendMessage = async event => {
    console.log('Mmessage clicked');
    let response = await apiConfig.post('/api/messages/send', {
      message: message,
      receiverID: chattingWith.id,
      senderID: currentUser.id,
    });

    setMessage('');
  };

  const handleSubmitOnEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage(event);
      messageBoxRef.current.blur();
    }
  };
  return (
    <div
      className='row message-box'
      style={{ margin: '0', backgroundColor: ' #fff', zIndex: '1000' }}>
      <div className='input-field col s11 offset-s0'>
        <textarea
          ref={messageBoxRef}
          onKeyUp={handleSubmitOnEnter}
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
