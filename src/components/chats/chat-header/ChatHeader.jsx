import React from 'react';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../../utils/format-time';
import './chat-header.style.css';
import FloatingButton from '../../../shared/floating-button/FloatingButton';
import FloatingButtonItem from '../../../shared/floating-button-item/FloatingButtonItem';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import RoundImage from '../../../shared/round-image/RoundImage';
import { clearChatHistoryAction } from '../../../redux/actions/chat.actions';
import {
  updateAudioStreamAction,
  showCallModalAction,
  startOutgoingCallAction,
} from '../../../redux/actions/call.action';

const ChatHeader = ({
  chattingWith,
  userTyping,
  outGoingCall,
  audio_call_initiated,
  usersOnline,
  clearChatHistoryAction,
  showCallModalAction,
  startOutgoingCallAction,
}) => {
  if (!chattingWith) {
    return <RequestLoading type='bar' show={true} />;
  }

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
          {outGoingCall || audio_call_initiated ? (
            <FloatingButtonItem
              title='On a call'
              icon='videocam'
              iconColor='#fff'
              colorClass={`disabled`}
              position='bottom'
            />
          ) : (
            <FloatingButtonItem
              onClick={startVideoCall}
              title='Video Call'
              icon='videocam'
              iconColor='#fff'
              colorClass={`green`}
              position='bottom'
            />
          )}
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
    chattingWith: state.chat.chattingWith,
    usersOnline: state.chat.usersOnline,
    userTyping: state.reaction.userTyping,
    outGoingCall: state.call.outGoingCall,
    audio_call_initiated: state.call.audio_call_initiated,
  };
};
export default connect(mapStateToProps, {
  clearChatHistoryAction,
  updateAudioStreamAction,
  showCallModalAction,
  startOutgoingCallAction,
})(ChatHeader);
