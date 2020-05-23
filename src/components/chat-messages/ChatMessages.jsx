import React from 'react';
import './chat-messages.style.css';
import Image from '../../shared/image/Image';
import Message from '../message/Message';
const ChatMessages = () => {
  return (
    <section className='chat-messages'>
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
      <Message sender='' />
      <Message sender='owner' />
    </section>
  );
};

export default ChatMessages;
