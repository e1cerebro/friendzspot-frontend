import React, { Fragment } from 'react';
import Image from '../../shared/image/Image';
import './chat-header.style.css';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
const ChatHeader = ({ chattingWith, usersOnline }) => {
  if (!chattingWith) {
    return <Fragment></Fragment>;
  }
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
              `Last seen ${chattingWith.lastseen}`}
          </span>
        </div>
      </div>
      <div className='chat-panel__header_right'>
        <Icon color='#fff' icon='more_vert' />
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
