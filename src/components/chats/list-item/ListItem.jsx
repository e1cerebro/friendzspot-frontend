import React from 'react';
import { connect } from 'react-redux';
import {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
} from '../../../redux/actions/chat.actions';
import Icon from '../../../shared/icon/Icon';
import Image from '../../../shared/image/Image';
import { GetTimeAgo } from '../../../utils/format-time';
import './list-item.style.css';
import { CHAT_API_URL } from '../../../utils/api-settings';

const ListItem = ({
  message,
  currentUser,
  unreadMessages,
  usersOnline,
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
}) => {
  const user =
    message.sender.id === currentUser.id ? message.receiver : message.sender;

  //When a user item is clicked.
  const userClicked = () => {
    const data = { ...user, currentUser: currentUser.id };
    fetchMessagesAction(data.id, data.currentUser);
    userItemClicked(data);
    readUnreadMessagesAction();
  };

  //get the right user profile photo
  const getImageURL = user => {
    if (user.profilePhotoURL) {
      return CHAT_API_URL + '/' + user.profilePhotoURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
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
          src={getImageURL(user)}
          style={{ height: '50px', width: '50px' }}
          alt={user.firstname}
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
            {unreadMessages && unreadMessages.length > 0 && (
              <span className='new badge green accent-4'>
                {unreadMessages.length}
              </span>
            )}
            {GetTimeAgo(message.created_at, 'long')}
          </span>
        </div>
        <p className='last-message'>
          <span className='message'>{message.message}</span>
        </p>
      </div>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.app.currentUser,
    usersOnline: state.chat.usersOnline,
    unreadMessages: state.chat.unreadMessages,
  };
};

export default connect(mapStateToProps, {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
})(ListItem);
