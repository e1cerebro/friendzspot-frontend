import React, { useEffect, useState, useContext, Fragment } from 'react';
import './message.style.css';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../utils/format-time';

const Message = ({ message, currentUser }) => {
  if (message) {
    return (
      <div
        className={`chat-msg    ${
          message.sender.id === currentUser.id ? 'owner' : ''
        }`}>
        <div className='chat-msg-content'>
          <div className='chat-msg-text'>
            <span className='message-content'>{message.message}</span>
            <small className='chat-msg-date'>
              {GetTimeAgo(message.created_at)}
            </small>
          </div>
        </div>
      </div>
    );
  }

  return <Fragment />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, null)(Message);
