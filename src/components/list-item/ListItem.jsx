import React from 'react';
import Icon from '../../shared/icon/Icon';
import Image from '../../shared/image/Image';
import './list-item.style.css';

const ListItem = ({ user }) => {
  return (
    <li id={user.id} className='chat-listing-single'>
      <div className='user-avater'>
        <Image
          src={`https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png`}
          style={{ height: '50px', width: '50px' }}
          alt={user.name}
          imageClass={'circle'}
        />
      </div>
      <div className='chat-info'>
        <div className='chat-info__single-item'>
          <span className='username'>{user.name}</span>
          <span className='secondary-content message-time '>
            {user.messageTime}
          </span>
        </div>
        <p className='last-message'>
          <Icon icon={`done_all`} /> {user.lastMessage}
        </p>
      </div>
    </li>
  );
};

export default ListItem;
