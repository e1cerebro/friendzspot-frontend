import React, { useState, useRef, useEffect } from 'react';
import './send-message-box.style.css';
import { connect } from 'react-redux';
import {
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
} from '../../../redux/actions/chat.actions';
import Icon from '../../../shared/icon/Icon';

const SendMessageBox = ({
  chattingWith,
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
  currentUser,
}) => {
  const [input, setInput] = useState({
    message: '',
    attachments: null,
  });

  const messageBoxRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleInputChange = event => {
    if (event.keyCode !== 13) {
      setInput({ ...input, [event.target.id]: event.target.value });
    }
  };

  const sendMessage = async () => {
    if (input.message || input.attachments) {
      sendChatMessageAction({
        message: input.message,
        receiverID: chattingWith.id,
        senderID: currentUser.id,
        attachments: input.attachments,
      });
    } else {
      alert('enter a message');
    }
    setInput({ message: '', attachments: null });
    messageBoxRef.current.value = '';
  };

  const handleMessageSubmit = event => {
    event.preventDefault();
    sendMessage();
  };

  const notifyTypingStarted = () => {
    notifyTypingStartedAction(chattingWith.id);
  };
  const notifyTypingStopped = () => {
    notifyTypingStoppedAction(chattingWith.id);
  };

  return (
    <div className='submit-text-box'>
      <div
        className=' message-box'
        style={{ margin: '0', backgroundColor: ' #fff', zIndex: '1000' }}>
        <div className='attach-file'>
          <i
            onClick={() => inputFileRef.current.click()}
            className='material-icons prefix  attach-files'>
            attach_file
          </i>
        </div>
        <div className='input-field' style={{ marginTop: '9px' }}>
          <input
            style={{ display: 'none' }}
            type='file'
            ref={inputFileRef}
            className='form-control-file'
            name='attachments'
            id='attachments'
            onChange={handleInputChange}
          />

          <textarea
            onFocus={notifyTypingStarted}
            onBlur={notifyTypingStopped}
            ref={messageBoxRef}
            onChange={handleInputChange}
            id='message'
            defaultValue={input.message}
            placeholder='Enter your message...'
            className='message-textbox scroll'></textarea>
        </div>

        <div className='send-btn'>
          <span className='submit-btn ' onClick={handleMessageSubmit}>
            <Icon icon='send' color='danger' size='40px' />
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
})(SendMessageBox);
