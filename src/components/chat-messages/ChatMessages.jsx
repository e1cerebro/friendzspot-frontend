import React, { useEffect, useState, useContext, useRef } from 'react';
import './chat-messages.style.css';
import Image from '../../shared/image/Image';
import Message from '../message/Message';
import SocketContext from '../../contexts/socket-context';
import { fetchMessagesAction } from '../../redux/actions/chat.actions';
import { connect } from 'react-redux';

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

  return (
    <section ref={chatMessagesRef} className='chat-messages scroll'>
      <div className='chat-messages'>
        {chatMessages &&
          chatMessages.map(message => {
            return <Message key={message.id} message={message} />;
          })}
      </div>
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
})(ChatMessages);
