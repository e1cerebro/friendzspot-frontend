import React from 'react';
import './list-item.style.css';
import Icon from '../../shared/icon/Icon';
import Image from '../../shared/image/Image';

const ListItem = ({ user }) => {
  return (
    <li id={user.id} class='chat-listing-single'>
      <div className='user-avater'>
        <Image
          src={`https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png`}
          style={{ height: '50px', width: '50px' }}
          alt={user.name}
          imageClass={'circle'}
        />
      </div>
      <div className='chat-info'>
        <div className='chat-list-single-user-info'>
          <div className='user-name-info'>
            <span class='username'>{user.name}</span>
          </div>
          <div class='secondary-content message-time right-align'>
            <span>{user.messageTime}</span>
          </div>
        </div>
        <p className='last-message'>
          {' '}
          <Icon icon={`check`} /> {user.lastMessage}
        </p>
      </div>
    </li>
  );
};

export default ListItem;
