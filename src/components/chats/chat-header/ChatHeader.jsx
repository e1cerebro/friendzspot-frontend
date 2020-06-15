import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import Image from '../../../shared/image/Image';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../../utils/format-time';
import './chat-header.style.css';
import FloatingButton from '../../../shared/floating-button/FloatingButton';
import FloatingButtonItem from '../../../shared/floating-button-item/FloatingButtonItem';
import {
  CHAT_API_URL,
  get_audio_permission,
} from '../../../utils/api-settings';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import Modal from '../../../shared/modal/Modal';
import M from 'materialize-css';
import RoundImage from '../../../shared/round-image/RoundImage';
import { clearChatHistoryAction } from '../../../redux/actions/chat.actions';
import SocketContext from '../../../contexts/socket-context';
import Peer from 'simple-peer';
import {
  audioCallInitiated,
  updateCallStreamAction,
  updateAudioStreamAction,
  addCallerStreamAction,
  addReceiverStreamAction,
  showCallModalAction,
  startOutgoingCallAction,
} from '../../../redux/actions/call.action';

const ChatHeader = ({
  currentUser,
  chattingWith,
  audioStream,
  userTyping,
  usersOnline,
  clearChatHistoryAction,
  audioCallInitiated,
  updateCallStreamAction,
  addCallerStreamAction,
  addReceiverStreamAction,
  showCallModalAction,
  startOutgoingCallAction,
}) => {
  if (!chattingWith) {
    return <RequestLoading type='bar' show={true} />;
  }

  const startAduioCall = async () => {};

  const startVideoCall = async () => {
    showCallModalAction();
    startOutgoingCallAction();
  };

  const viewProfile = () => {
    console.log('View Profile clicked');
  };

  const clearChatHistory = () => {
    clearChatHistoryAction(chattingWith.id);
    console.log('clear Chat History clicked: ' + chattingWith.id);
  };

  const getImageURL = user => {
    if (user.profilePhotoURL) {
      return CHAT_API_URL + '/' + user.profilePhotoURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  return (
    <div className='chat-panel__header' style={{ position: 'relative' }}>
      <div className='chat-panel__header_left'>
        <div className='user-avater'>
          <RoundImage size='50px' url={chattingWith.profilePhotoURL} />
          {usersOnline && usersOnline.includes(chattingWith.id) ? (
            <span className='online-icon'> </span>
          ) : (
            <span className='offline-icon'> </span>
          )}
        </div>

        <div className='user-info'>
          <span className='user-info__username'>
            {chattingWith.firstname} {chattingWith.lastname}
          </span>
          <span className='user-info__last-seend'>
            {usersOnline && usersOnline.includes(chattingWith.id) && (
              <span className=''>Online</span>
            )}

            {usersOnline &&
              !usersOnline.includes(chattingWith.id) &&
              chattingWith.lastseen &&
              `Last seen ${GetTimeAgo(chattingWith.lastseen)}`}
          </span>

          {userTyping && userTyping.includes(chattingWith.id) && (
            <span className='user-typing'>
              {chattingWith.firstname} is typing...
            </span>
          )}
        </div>
      </div>
      <div className='chat-panel__header_right'>
        <FloatingButton>
          <FloatingButtonItem
            onClick={startAduioCall}
            title='Audio Call'
            icon='call'
            iconColor='#fff'
            colorClass='yellow darken-4'
            position='bottom'
          />
          <FloatingButtonItem
            onClick={startVideoCall}
            title='Video Call'
            icon='videocam'
            iconColor='#fff'
            colorClass='green'
            position='bottom'
          />
          <FloatingButtonItem
            onClick={viewProfile}
            title={`View ${chattingWith.firstname}'s Profile`}
            icon='account_circle'
            iconColor='#fff'
            colorClass='blue darken-4'
            position='bottom'
          />{' '}
          <FloatingButtonItem
            onClick={clearChatHistory}
            title={`Clear History`}
            icon='hourglass_empty'
            iconColor='#fff'
            colorClass='red darken-4'
            position='bottom'
          />
        </FloatingButton>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    chattingWith: state.chat.chattingWith,
    usersOnline: state.chat.usersOnline,
    userTyping: state.reaction.userTyping,
    audioStream: state.call.stream,
  };
};
export default connect(mapStateToProps, {
  clearChatHistoryAction,
  audioCallInitiated,
  updateCallStreamAction,
  updateAudioStreamAction,
  addCallerStreamAction,
  addReceiverStreamAction,
  showCallModalAction,
  startOutgoingCallAction,
})(ChatHeader);
