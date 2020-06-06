import React, { useState, useRef, useEffect } from 'react';
import './send-message-box.style.css';
import { connect } from 'react-redux';
import { sendChatMessageAction } from '../../../redux/actions/chat.actions';

const SendMessageBox = ({
  chattingWith,
  sendChatMessageAction,
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
      console.log('Message sent');
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
          className='row message-box'
          style={{ margin: '0', backgroundColor: ' #fff', zIndex: '1000' }}>
          <div className='input-field col s10'>
            <i
              onClick={() => inputFileRef.current.click()}
              className='material-icons prefix  attach-files'>
              attach_file
            </i>

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
              className='materialize-textarea validate'></textarea>

            <button
              className='btn submit-btn   red darken-4 prefix'
              type='submit'
              name='action'>
              send <i className='material-icons right'>send</i>
            </button>
            {/* <i
            onClick={sendMessage}
            className='material-icons prefix send-button'>
            send
          </i> */}
            {/* <label style={{ marginLeft: '50px' }} htmlFor='message-box'>
          Start typing your message...
        </label> */}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, { sendChatMessageAction })(
  SendMessageBox
);
