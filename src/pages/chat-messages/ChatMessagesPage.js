import React, { useContext, Fragment, useEffect } from 'react';
import UserListings from '../../components/user-listings/UserListings';
import SearchField from '../../shared/search-field/SearchField';
import ChatHeader from '../../components/chat-header/ChatHeader';
import ChatMessages from '../../components/chat-messages/ChatMessages';
import SendMessageBox from '../../components/send-mesage-box/SendMessageBox';
import BackgroundImage from '../../images/chat-bg.jpg';
import StaticImage from '../../images/static-logo.png';
import './chat-messages.style.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
        <div className='col s4' style={{ padding: 0 }}>
          <SearchField />
          <UserListings />
        </div>
        <div
          className='col s8 chat-panel'
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
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, null)(ChatMessagesPage);
