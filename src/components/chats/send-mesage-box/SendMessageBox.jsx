import React, { useState, useRef, useEffect } from 'react';
import './send-message-box.style.css';
import { connect } from 'react-redux';
import {
  sendChatMessageAction,
  fetchLastMessagesAction,
} from '../../../redux/actions/chat.actions';
import { autoExpand } from '../../../utils/inputs';
import Icon from '../../../shared/icon/Icon';

const SendMessageBox = ({
  chattingWith,
  sendChatMessageAction,
  fetchLastMessagesAction,
  currentUser,
}) => {
  const [input, setInput] = useState({
    message: '',
    attachments: null,
  });

  const messageBoxRef = useRef(null);
  const messageFormRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleInputChange = event => {
    autoExpand(event.target);
    if (event.keyCode !== 13) {
      setInput({ ...input, [event.target.id]: event.target.value });
      autoExpand(event.target);
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
      //fetchLastMessagesAction();
    } else {
      alert('enter a message');
    }
    setInput({ message: '', attachments: null });
    messageBoxRef.current.value = '';
  };

  const handleSubmitOnEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleMessageSubmit = event => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className='submit-text-box'>
      <form action='post' ref={messageFormRef} onSubmit={handleMessageSubmit}>
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
          <div className='input-field'>
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
              ref={messageBoxRef}
              onKeyUp={handleSubmitOnEnter}
              onChange={handleInputChange}
              id='message'
              defaultValue={input.message}
              className='message-textbox scroll'></textarea>
          </div>

          <div className='send-btn'>
            <span className='submit-btn ' onClick={handleMessageSubmit}>
              <Icon icon='send' color='danger' size='40px' />
            </span>
          </div>
        </div>
      </form>
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
  fetchLastMessagesAction,
  sendChatMessageAction,
})(SendMessageBox);
