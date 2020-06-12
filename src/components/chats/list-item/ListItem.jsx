import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
} from '../../../redux/actions/chat.actions';
import Image from '../../../shared/image/Image';
import { GetTimeAgo } from '../../../utils/format-time';
import './list-item.style.css';
import { CHAT_API_URL } from '../../../utils/api-settings';
import Icon from '../../../shared/icon/Icon';
import M from 'materialize-css';
import { shortenString } from '../../../utils/text-utils';
import RoundImage from '../../../shared/round-image/RoundImage';

const ListItem = ({
  message,
  currentUser,
  unreadMessages,
  usersOnline,
  userTyping,
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
}) => {
  let instance;

  const user =
    message.sender.id === currentUser.id ? message.receiver : message.sender;

  //When a user item is clicked.
  const userClicked = () => {
    const data = { ...user, currentUser: currentUser.id };
    fetchMessagesAction(data.id, data.currentUser);
    userItemClicked(data);
    readUnreadMessagesAction(data);
  };

  //get the right user profile photo
  const getImageURL = user => {
    if (user.profilePhotoURL) {
      return CHAT_API_URL + '/' + user.profilePhotoURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  const mobileUserClicked = () => {
    const elem = document.querySelector('#chat-messages');
    instance = M.Modal.init(elem, { dismissible: false });

    userClicked();

    if (instance) {
      instance.open();
    }
  };

  const friendOnline = message => {
    let userId =
      message.sender.id === currentUser.id
        ? message.receiver.id
        : message.sender.id;
    return usersOnline && usersOnline.includes(userId);
  };

  return (
    <Fragment>
      <li
        onClick={userClicked}
        id={user.id}
        className='chat-listing-single hide-on-small-only'>
        <div className='user-avater'>
          {friendOnline(message) ? (
            <span className='online-icon'> </span>
          ) : (
            <span className='offline-icon'> </span>
          )}

          <RoundImage size='50px' url={user.profilePhotoURL} />
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
            <span className='message'>
              {shortenString(message.message, 25)}
            </span>
          </p>

          {userTyping && userTyping.includes(user.id) && (
            <span className='user-typing'>
              <span className='content'>{user.firstname} is typing...</span>
            </span>
          )}
        </div>
      </li>

      <li
        onClick={mobileUserClicked}
        id={user.id}
        className='chat-listing-single how-on-medium hide-on-med-and-up'>
        <div className='user-avater'>
          {usersOnline && usersOnline.includes(message.sender.id) ? (
            <span className='online-icon'> </span>
          ) : (
            <span className='offline-icon'> </span>
          )}

          <RoundImage size='50px' url={user.profilePhotoURL} />
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
            <span className='message'>
              {shortenString(message.message, 25)}
            </span>
          </p>

          {userTyping && userTyping.includes(user.id) && (
            <span className='user-typing'>
              <span className='content'>{user.firstname} is typing...</span>
            </span>
          )}
        </div>
      </li>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const unreadMessageLists = state.chat.unreadMessages.filter(messageObj => {
    return ownProps.message.sender.id === messageObj.sender.id;
  });
  return {
    currentUser: state.auth.currentUser,
    usersOnline: state.chat.usersOnline,
    userTyping: state.reaction.userTyping,
    unreadMessages: unreadMessageLists,
  };
};

export default connect(mapStateToProps, {
  userItemClicked,
  fetchMessagesAction,
  readUnreadMessagesAction,
})(ListItem);
