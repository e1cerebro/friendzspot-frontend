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
import { CHAT_API_URL } from '../../../utils/api-settings';
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
} from '../../../redux/actions/call.action';

const ChatHeader = ({
  currentUser,
  chattingWith,
  callStream,
  userTyping,
  usersOnline,
  clearChatHistoryAction,
  audioCallInitiated,
  updateCallStreamAction,
}) => {
  const [startCall, setStartCall] = useState(false);
  const { socket, socketID } = useContext(SocketContext);

  const sourceRef = useRef(null);
  const audioRef = useRef(null);

  let modal;
  useEffect(() => {
    var elems = document.getElementById('video-id');
    modal = M.Modal.init(elems);
  }, []);

  // useEffect(() => {
  //   console.log(callStream);
  // }, [callStream]);

  if (!chattingWith) {
    return <RequestLoading type='bar' show={true} />;
  }

  const startAduioCall = async () => {
    let requestStream;
    try {
      requestStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      updateCallStreamAction(requestStream);
    } catch (error) {
      console.log(error);
    }

    console.log('Audio Call clicked');
    setStartCall(true);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: callStream,
    });

    peer.on('signal', data => {
      const callInfo = {
        userToCall: chattingWith.id,
        signalData: data,
        from: currentUser.id,
      };
      //dispatch calling action
      audioCallInitiated(callInfo);
    });

    peer.on('stream', stream => {
      if (audioRef.current) {
        audioRef.current.srcObject = callStream;
      }
    });

    socket.on('callAccepted', signal => {
      console.log(signal);
      peer.signal(signal);
    });
  };

  const startVideoCall = () => {
    console.log('Video Call clicked');
  };

  const viewProfile = () => {
    console.log('View Profile clicked');
    modal.open();
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
      <audio
        id='musicaudio'
        preload='none'
        style={{ display: 'none' }}
        className='raw-player'
        controls
        ref={audioRef}>
        <source ref={sourceRef} src='' type='audio/mpeg' />
      </audio>
      <div className='chat-panel__header_left'>
        <Modal id='video-id'></Modal>
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

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.currentUser,
    chattingWith: state.chat.chattingWith,
    usersOnline: state.chat.usersOnline,
    userTyping: state.reaction.userTyping,
    callStream: state.call.stream,
  };
};
export default connect(mapStateToProps, {
  clearChatHistoryAction,
  audioCallInitiated,
  updateCallStreamAction,
})(ChatHeader);
