import React, { useState, useRef, useEffect } from 'react';
import './send-message-box.style.css';
import { CHAT_API_URL } from '../../utils/api-settings';
import { connect } from 'react-redux';
import apiConfig from '../../api-config/config';

const SendMessageBox = ({ chattingWith, currentUser }) => {
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

  useEffect(() => {}, [input]);
  const sendMessage = async () => {
    if (input.message || input.attachments) {
      await apiConfig.post('/api/messages/send', {
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
    console.log('Submitted');
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

export default connect(mapStateToProps, null)(SendMessageBox);
