import React from 'react';
import UserListings from '../../components/user-listings/UserListings';
import SearchField from '../../shared/search-field/SearchField';

import './chat-messages.style.css';

const chatMessages = () => {
  return (
    <div class='row chat-section'>
      <div class='col s5 user-listing scroll'>
        <SearchField />
        <UserListings />
      </div>
      <div class='col s7 chat-panel'>Chat Panel</div>
    </div>
  );
};

export default chatMessages;
