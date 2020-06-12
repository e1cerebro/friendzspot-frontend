import React, { useEffect, useState, useContext, Fragment } from 'react';
import './message.style.css';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../../utils/format-time';
import Icon from '../../../shared/icon/Icon';
import { ReactTinyLink } from 'react-tiny-link';
import M from 'materialize-css';

const Message = ({ message, currentUser }) => {
  const sender =
    message && message.sender.id === currentUser.id ? 'owner' : 'friend';

  useEffect(() => {
    if (message) {
      scrollToCurrentMessage(message);
    }
  }, []);
  const scrollToCurrentMessage = message => {
    if (!message) return;
    const currentMessage = document.getElementById(message.id);
    if (currentMessage) {
      const topPos = currentMessage.offsetTop;
      const container = document.getElementById('messageBody');

      document.getElementById('messageBody').scrollTop =
        topPos - container.offsetTop;
    }
  };

  const messageSender = () => {
    if (message && message.sender.id === currentUser.id) {
      return (
        <Fragment>
          <Icon icon='person' color='#fff' />
          <span className='sender-name'> {message.sender.firstname}</span>
        </Fragment>
      );
    }
  };
  const messageReceiver = () => {
    if (message && message.sender.id !== currentUser.id) {
      return (
        <Fragment>
          <Icon icon='person' color='#fff' />
          <span className='sender-name'> {message.sender.firstname}</span>
        </Fragment>
      );
    }
  };

  const showLinkPreview = message => {
    var urlRE = new RegExp(
      '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+'
    );
    const link = message.match(urlRE);
    if (link) {
      return (
        <ReactTinyLink
          cardSize='small'
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={`${link[0]}`}
        />
      );
    } else {
    }
  };

  if (message) {
    return (
      <div className={`chat-msg ${sender}`} id={message.id}>
        <div className='chat-msg-content'>
          <div className='chat-msg-text'>
            <div className='message-header'>
              <div className='left'>
                <span className='message-content'>{message.message} </span>
              </div>
              <div className='right message-more-actions'>
                <Icon icon='expand_more' color='#000' size='22px' />
              </div>
            </div>
            <div className='link-preview'>
              {showLinkPreview(message.message)}
            </div>
            <div className='message-footer'>
              <small className='chat-msg-date'></small>
              <div className={`message-meta ${sender}`}>
                <div className='left'>
                  <small className='message-time'>
                    {GetTimeAgo(message.created_at, 'long')}
                  </small>
                </div>
                <div className='right' style={{ opacity: '0.5' }}>
                  <small style={{ display: 'flex' }}>
                    {messageReceiver()} {messageSender()}
                  </small>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    );
  }

  return <Fragment />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(Message);
