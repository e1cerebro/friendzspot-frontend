import React, { useEffect, useState, useContext, useRef } from 'react';
import './chat-messages.style.css';
import Image from '../../shared/image/Image';
import Message from '../message/Message';
import SocketContext from '../../contexts/socket-context';
import {
  fetchMessagesAction,
  readUnreadMessagesAction,
} from '../../redux/actions/chat.actions';
import { connect } from 'react-redux';

const ChatMessages = ({
  chattingWith,
  chatMessages,
  currentUser,
  fetchMessagesAction,
  readUnreadMessagesAction,
}) => {
  const chatMessagesRef = useRef();

  useEffect(() => {
    fetchMessagesAction(chattingWith.id, currentUser.id);
  }, []);

  const readUnreadMessages = () => {
    if (
      chatMessagesRef.current.scrollHeight -
        chatMessagesRef.current.scrollTop ===
      chatMessagesRef.current.clientHeight
    ) {
      readUnreadMessagesAction({
        sender: chattingWith.id,
        receiver: currentUser.id,
      });
    }
  };

  return (
    <section
      ref={chatMessagesRef}
      className='chat-messages scroll'
      onScroll={readUnreadMessages}>
      {chatMessages &&
        chatMessages.map(message => {
          return <Message key={message.id} message={message} />;
        })}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    chatMessages: state.chat.messages,
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesAction,
  readUnreadMessagesAction,
})(ChatMessages);
