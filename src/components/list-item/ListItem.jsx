import React from 'react';
import Icon from '../../shared/icon/Icon';
import Image from '../../shared/image/Image';
import './list-item.style.css';
import { connect } from 'react-redux';
import {
  userItemClicked,
  fetchMessagesAction,
} from '../../redux/actions/chat.actions';

const ListItem = ({
  message,
  currentUser,
  unreadMessages,
  usersOnline,
  userItemClicked,
  fetchMessagesAction,
}) => {
  const user = message.sender;
  const userClicked = () => {
    const data = { ...user, currentUser: currentUser.id };
    fetchMessagesAction(data.id, data.currentUser);
    userItemClicked(data);
  };

  return (
    <li onClick={userClicked} id={user.id} className='chat-listing-single'>
      <div className='user-avater'>
        {usersOnline && usersOnline.includes(message.sender.id) ? (
          <span className='online-icon'> </span>
        ) : (
          <span className='offline-icon'> </span>
        )}

        <Image
          src={`https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png`}
          style={{ height: '50px', width: '50px' }}
          alt={user.name}
          imageClass={`circle circle-img ${
            usersOnline && usersOnline.includes(message.sender.id)
              ? 'online'
              : 'offline'
          }`}
        />
      </div>
      <div className='chat-info'>
        <div className='chat-info__single-item'>
          <span className='username'>
            {user.firstname} {user.lastname}
          </span>
          <span className='secondary-content message-time '>
            {unreadMessages.length > 0 && (
              <span className='new badge green accent-4'>
                {unreadMessages.length}
              </span>
            )}
            5.00 p.m.
          </span>
        </div>
        <p className='last-message'>
          <Icon icon={`done_all`} /> {message.message}{' '}
        </p>
      </div>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
  const msgs = state.chat.unreadMessages.filter(message => {
    return (
      message.receiver === state.app.currentUser.id &&
      message.sender === ownProps.message.sender.id
    );
  });
  return {
    currentUser: state.app.currentUser,
    usersOnline: state.chat.usersOnline,
    unreadMessages: msgs,
  };
};

export default connect(mapStateToProps, {
  userItemClicked,
  fetchMessagesAction,
})(ListItem);
