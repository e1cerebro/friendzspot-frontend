import React, { useContext, Fragment, useEffect } from 'react';
import SearchField from '../../shared/search-field/SearchField';
import BackgroundImage from '../../images/chat-bg.jpg';
import StaticImage from '../../images/static-logo.png';
import './chat-messages.style.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatHeader from '../../components/chats/chat-header/ChatHeader';
import ChatMessages from '../../components/chats/chat-messages/ChatMessages';
import UserListings from '../../components/chats/user-listings/UserListings';
import SendMessageBox from '../../components/chats/send-mesage-box/SendMessageBox';

const ChatMessagesPage = ({ chattingWith, currentUser }) => {
  let history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser]);

  {
    return currentUser ? (
      <div className='row chat-section'>
        <div className='col s12 m4' style={{ padding: 0 }}>
          <SearchField />
          <UserListings />
        </div>
        <div
          className='col s12 m8 chat-panel'
          style={chattingWith ? defaultBgImage : staticBgImage}>
          {chattingWith && (
            <Fragment>
              <div className='layer'></div>
              <div className='' style={{ zIndex: '1000' }}>
                <ChatHeader />
                <ChatMessages />
              </div>
              <SendMessageBox />
            </Fragment>
          )}
        </div>
      </div>
    ) : (
      <p></p>
    );
  }
};

const defaultBgImage = {
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  minHeight: '14vh',
};

const staticBgImage = {
  backgroundImage: `url(${StaticImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  padding: '0',
  minHeight: '14vh',
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(ChatMessagesPage);
