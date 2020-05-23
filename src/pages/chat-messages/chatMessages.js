import React from 'react';
import UserListings from '../../components/user-listings/UserListings';
import SearchField from '../../shared/search-field/SearchField';

import './chat-messages.style.css';
import ChatHeader from '../../components/chat-header/ChatHeader';
import ChatMessages from '../../components/chat-messages/ChatMessages';
import SendMessageBox from '../../components/send-mesage-box/SendMessageBox';

import BackgroundImage from '../../images/chat-bg.jpg';

const chatMessages = () => {
  return (
    <div className='row chat-section'>
      <div className='col s4 user-listing scroll'>
        <SearchField />
        <UserListings />
      </div>
      <div className='col s8 chat-panel' style={defaultBgImage}>
        <div className='layer'></div>
        <div className='' style={{ zIndex: '1000' }}>
          <ChatHeader />
          <ChatMessages />
        </div>
        <SendMessageBox />
      </div>
    </div>
  );
};

const defaultBgImage = {
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  minHeight: '14vh',
};

export default chatMessages;
