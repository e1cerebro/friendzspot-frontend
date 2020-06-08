import React, { useEffect, useRef, Fragment } from 'react';
import './chat-messages.style.css';
import Message from '../message/Message';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../../utils/format-time';
import { fetchMessagesAction } from '../../../redux/actions/chat.actions';

const ChatMessages = ({
  chattingWith,
  chatMessages,
  currentUser,
  fetchMessagesAction,
}) => {
  const chatMessagesRef = useRef(null);

  const updateScroll = () => {
    let element = chatMessagesRef.current;
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    fetchMessagesAction(chattingWith.id, currentUser.id);
    updateScroll();
  }, []);

  const messageDate = [];

  const displayMessageDate = message => {
    const date = GetTimeAgo(message.created_at);

    if (!messageDate.includes(date)) {
      messageDate.push(date);
      return (
        <div className='message-date'>
          <span className='message-date__text'>{GetTimeAgo(date)}</span>
        </div>
      );
    }
  };

  return (
    <section
      ref={chatMessagesRef}
      id='messageBody'
      className='chat-messages scroll'>
      <div className='chat-messages'>
        {chatMessages &&
          chatMessages.map(message => {
            return (
              <Fragment key={message.created_at + message.updated_at}>
                {displayMessageDate(message)}

                <Message key={message.id} message={message} />
              </Fragment>
            );
          })}
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    chatMessages: state.chat.sentMessages,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesAction,
})(ChatMessages);
