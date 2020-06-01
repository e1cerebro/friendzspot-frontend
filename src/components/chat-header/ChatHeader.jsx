import React, { Fragment, useEffect, useRef } from 'react';
import Image from '../../shared/image/Image';

import { connect } from 'react-redux';
import { GetTimeAgo } from '../../utils/format-time';

import './chat-header.style.css';
import FloatingButton from '../../shared/floating-button/FloatingButton';
import FloatingButtonItem from '../../shared/floating-button-item/FloatingButtonItem';

const ChatHeader = ({ chattingWith, usersOnline }) => {
  if (!chattingWith) {
    return <Fragment></Fragment>;
  }

  const startAduioCall = () => {
    console.log('Audio Call clicked');
  };

  const startVideoCall = () => {
    console.log('Video Call clicked');
  };

  const viewProfile = () => {
    console.log('View Profile clicked');
  };

  const blockUser = () => {
    console.log('Block user clicked');
  };

  return (
    <div className='chat-panel__header'>
      <div className='chat-panel__header_left'>
        <div className='user-avater'>
          <Image
            src={`https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png`}
            style={{ height: '50px', width: '50px' }}
            alt={`John Doe`}
            imageClass={`circle circle-img ${
              usersOnline && usersOnline.includes(chattingWith.id)
                ? 'online'
                : 'offline'
            }`}
          />
          {usersOnline && usersOnline.includes(chattingWith.id) ? (
            <span className='online-icon'> </span>
          ) : (
            <span className='offline-icon'> </span>
          )}
        </div>

        <div className='user-info'>
          <span className='user-info__username'>
            {chattingWith.firstname} {chattingWith.lastname}
          </span>
          <span className='user-info__last-seend'>
            {usersOnline && usersOnline.includes(chattingWith.id) && (
              <span className=''>Online</span>
            )}

            {usersOnline &&
              !usersOnline.includes(chattingWith.id) &&
              chattingWith.lastseen &&
              `Last seen ${GetTimeAgo(chattingWith.lastseen)}`}
          </span>
        </div>
      </div>
      <div className='chat-panel__header_right'>
        <FloatingButton>
          <FloatingButtonItem
            onClick={startAduioCall}
            title='Audio Call'
            icon='call'
            iconColor='#fff'
            colorClass='yellow darken-4'
            position='bottom'
          />
          <FloatingButtonItem
            onClick={startVideoCall}
            title='Video Call'
            icon='videocam'
            iconColor='#fff'
            colorClass='green'
            position='bottom'
          />
          <FloatingButtonItem
            onClick={viewProfile}
            title={`View ${chattingWith.firstname}'s Profile`}
            icon='account_circle'
            iconColor='#fff'
            colorClass='blue darken-4'
            position='bottom'
          />{' '}
          <FloatingButtonItem
            onClick={blockUser}
            title={`Block ${chattingWith.firstname}`}
            icon='block'
            iconColor='#fff'
            colorClass='red darken-4'
            position='bottom'
          />
        </FloatingButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    usersOnline: state.chat.usersOnline,
  };
};
export default connect(mapStateToProps, null)(ChatHeader);
