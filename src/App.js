import React, { useEffect, useContext, useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessagesPage from './pages/chat-messages/ChatMessagesPage';
import AuthPage from './pages/user-auth/AuthPage';
import { connect } from 'react-redux';
import People from './pages/people/People';
import FriendsPage from './pages/friends-page/FriendsPage';
import UserProfilePage from './pages/user-profile/UserProfilePage';
import { loginTokenAction } from './redux/actions/auth.actions';
import { useHistory } from 'react-router-dom';
import { updateAudioStreamAction } from './redux/actions/call.action';
import messageURL from './sounds/message_received2.mp3';
import { get_audio_permission } from './utils/api-settings';
import VideoContainer from './shared/video-call/container/VideoContainer';
import IncomingCall from './shared/video-call/incoming-call/IncomingCall';
import FloatingCallButton from './shared/video-call/floating-call-button/FloatingCallButton';
import SocketObservers from './shared/socket-observers/SocketObservers';
import './App.css';

const App = ({
  browerMediaStream,
  loginTokenAction,
  updateAudioStreamAction,
}) => {
  const sourceRef = useRef(null);
  const audioRef = useRef(null);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem('user');
      if (userToken) {
        loginTokenAction(userToken);

        if (!browerMediaStream) {
          const stream = await get_audio_permission();
          updateAudioStreamAction(stream);
        }
      } else {
        history.push('/login');
      }
    })();
  }, []);

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
        <Route exact path='/me' component={UserProfilePage} />
        <Route exact path='/friends' component={FriendsPage} />
      </Switch>
      <SocketObservers audioRef={audioRef} />
      <IncomingCall />
      <VideoContainer />
      <FloatingCallButton />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    browerMediaStream: state.call.stream,
  };
};

export default connect(mapStateToProps, {
  loginTokenAction,
  updateAudioStreamAction,
})(App);
