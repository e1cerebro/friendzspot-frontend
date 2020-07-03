import React, { useContext, Fragment, useEffect } from 'react';
import SearchField from '../../shared/search-field/SearchField';
import BackgroundImage from '../../images/chat-wallpaper.jpg';
import StaticImage from '../../images/static-logo.png';
import './chat-messages.style.css';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatHeader from '../../components/chats/chat-header/ChatHeader';
import ChatMessages from '../../components/chats/chat-messages/ChatMessages';
import UserListings from '../../components/chats/user-listings/UserListings';
import SendMessageBox from '../../components/chats/send-mesage-box/SendMessageBox';
import Modal from '../../shared/modal/Modal';
import M from 'materialize-css';

const ChatMessagesPage = ({ chattingWith, currentUser }) => {
  let history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser]);

  const modalClose = () => {
    var elems = document.getElementById('chat-messages');
    let modal = M.Modal.init(elems);
    modal.close();
  };

  {
    return currentUser ? (
      <div className='row chat-section'>
        <div className='col s12 m4 column'  style={{ padding: 0 }}>
          <SearchField />
          <UserListings />
        </div>

        <div
          className='col s12 m8  hide-on-small-only	column'
          style={chattingWith ? defaultBgImage : staticBgImage}>
          {chattingWith && (
            <Fragment>
              <ChatHeader />
              <ChatMessages />
              <SendMessageBox />
            </Fragment>
          )}
        </div>
        <Modal
          modalClose={modalClose}
          bgImage={chattingWith ? defaultBgImage : staticBgImage}
          id='chat-messages'
          className='modal-fixed-footer  bottom-sheet chat-modal'
          footer={<SendMessageBox />}
          header={<ChatHeader />}>
          <Fragment>
            <ChatMessages />
          </Fragment>
        </Modal>
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
  backgroundSize: 'cover',
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
