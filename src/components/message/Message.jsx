import React, { useEffect, useState, useContext } from 'react';
import './message.style.css';
import { connect } from 'react-redux';

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={`chat-msg    ${
        message.sender.id === currentUser.id ? 'owner' : ''
      }`}>
      <div className='chat-msg-content'>
        <div className='chat-msg-text'>
          {message.message}
          <small className='chat-msg-date'>
            Message sent {message.created_at}
          </small>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, null)(Message);
