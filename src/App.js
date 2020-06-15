import React, { useEffect, useContext, useRef, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessagesPage from './pages/chat-messages/ChatMessagesPage';
import AuthPage from './pages/user-auth/AuthPage';
import { connect } from 'react-redux';
import People from './pages/people/People';
import SocketContext from './contexts/socket-context';
import {
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
  receivedNewMessageAction,
  fetchLastMessagesAction,
} from './redux/actions/chat.actions';
import FriendsPage from './pages/friends-page/FriendsPage';
import UserProfilePage from './pages/user-profile/UserProfilePage';
import { loginTokenAction } from './redux/actions/auth.actions';
import { useHistory } from 'react-router-dom';
import {
  updateTypingStartedAction,
  updateTypingStoppedAction,
} from './redux/actions/reaction.actions';
import Peer from 'simple-peer';
import {
  audioCallAccepted,
  updateAudioStreamAction,
  startIncomingCallAction,
} from './redux/actions/call.action';
//Sounds
import messageURL from './sounds/message_received2.mp3';
import userTypingSound from './sounds/user_typing.mp3';
import { get_audio_permission } from './utils/api-settings';
import VideoContainer from './shared/video-call/container/VideoContainer';
import IncomingCall from './shared/video-call/incoming-call/IncomingCall';
const App = ({
  currentUser,
  chattingWith,
  audioStream,
  loginTokenAction,
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
  fetchLastMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
  receivedNewMessageAction,
  updateTypingStartedAction,
  updateTypingStoppedAction,
  audioCallAccepted,
  updateAudioStreamAction,
  startIncomingCallAction,
}) => {
  const { socket, socketID } = useContext(SocketContext);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);

  let history = useHistory();

  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem('user');
      if (userToken) {
        loginTokenAction(userToken);
        if (
          audioStream &&
          Object.keys(audioStream).length === 0 &&
          audioStream.constructor === Object
        ) {
          const stream = await get_audio_permission();
          updateAudioStreamAction(stream);
        }

        if (!audioStream) {
          const stream = await get_audio_permission();
          updateAudioStreamAction(stream);
        }
      } else {
        history.push('/login');
      }
    })();
  }, []);

  useEffect(() => {
    if (socket) {
      initialConnectionEstablishedAction(socketID);
      socket.on('new message', data => {
        fetchLastMessagesAction();
        updateUnreadMessagesAction(data);
        receivedNewMessageAction(data);
        audioRef.current.src = messageURL;
        audioRef.current.play();
      });

      socket.on('started typing', userId => {
        updateTypingStartedAction(userId);
        //userTypingSound
        audioRef.current.src = userTypingSound;
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      });

      socket.on('stopped typing', userId => {
        updateTypingStoppedAction(userId);
      });

      socket.on('incomingCall', async incomingCallData => {
        const audioStream = await get_audio_permission();
        startIncomingCallAction(incomingCallData);
      });

      socket.on('user connected', userId => {
        updateUsersOnlineAction(userId);
      });

      socket.on('user disconnected', userId => {
        removeUsersOnlineAction(userId);
      });
    }
    return () => {};
  }, [socket]);

  return (
    <div className='container'>
      <audio
        id='musicaudio'
        preload='none'
        style={{ display: 'none' }}
        className='raw-player'
        controls
        ref={audioRef}>
        <source
          ref={sourceRef}
          src={messageURL ? messageURL : ''}
          type='audio/mpeg'
        />
      </audio>

      <Navigation />
      <Switch>
        <Route exact path='/' component={ChatMessagesPage} />
        <Route exact path='/login' component={AuthPage} />
        <Route exact path='/messenger' component={ChatMessagesPage} />
        <Route exact path='/people' component={People} />
        <Route exact path='/my-profile' component={UserProfilePage} />
        <Route exact path='/friends' component={FriendsPage} />
      </Switch>
      <IncomingCall />
      <VideoContainer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.auth.currentUser,
    audioStream: state.call.stream,
  };
};

export default connect(mapStateToProps, {
  loginTokenAction,
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
  fetchLastMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
  receivedNewMessageAction,
  updateTypingStartedAction,
  updateTypingStoppedAction,
  audioCallAccepted,
  updateAudioStreamAction,
  startIncomingCallAction,
})(App);
