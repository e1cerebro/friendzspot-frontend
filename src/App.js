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
  fetchMessagesAction,
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
  updateCallStreamAction,
} from './redux/actions/call.action';
//Sounds
import messageURL from './sounds/message_received2.mp3';
import userTypingSound from './sounds/user_typing.mp3';

const App = ({
  currentUser,
  chattingWith,
  callStream,
  loginTokenAction,
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
  fetchMessagesAction,
  fetchLastMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
  receivedNewMessageAction,
  updateTypingStartedAction,
  updateTypingStoppedAction,
  audioCallAccepted,
  updateCallStreamAction,
}) => {
  const [stream, setStream] = useState(false);

  const { socket, socketID } = useContext(SocketContext);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);

  let history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      loginTokenAction(userToken);
    } else {
      history.push('/login');
    }
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
        audioRef.current.volume = 0.1;
        audioRef.current.play();
      });

      socket.on('stopped typing', userId => {
        updateTypingStoppedAction(userId);
      });

      socket.on('incomingCall', callInfo => {
        console.log('Incoming Call...');
        console.log(callInfo);

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then(stream => {
            updateCallStreamAction(stream);
            console.log('Request Audio', stream);
            console.log(callStream);
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: stream,
            });

            peer.on('signal', data => {
              const acceptInfo = { signal: data, to: callInfo.from };
              audioCallAccepted(acceptInfo);
            });

            peer.on('stream', stream => {
              audioRef.current.srcObject = stream;
            });

            peer.signal(callInfo.signalData);
          })
          .catch(error => {
            console.log(error);
          });

        // const peer = new Peer({
        //   initiator: false,
        //   trickle: false,
        //   stream: stream,
        // });

        // peer.on('signal', data => {
        //   const acceptInfo = { signal: data, to: callInfo.from };
        //   audioCallAccepted(acceptInfo);
        // });

        // peer.on('stream', stream => {
        //   audioRef.current.srcObject = stream;
        // });

        // peer.signal(callInfo.signalData);
      });

      socket.on('user connected', userId => {
        updateUsersOnlineAction(userId);
      });

      socket.on('user disconnected', userId => {
        removeUsersOnlineAction(userId);
      });
    }
    return () => {};
  }, [socket, callStream]);

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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.auth.currentUser,
    callStream: state.call.stream,
  };
};

export default connect(mapStateToProps, {
  loginTokenAction,
  initialConnectionEstablishedAction,
  fetchMessagesAction,
  updateUnreadMessagesAction,
  fetchLastMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
  receivedNewMessageAction,
  updateTypingStartedAction,
  updateTypingStoppedAction,
  audioCallAccepted,
  updateCallStreamAction,
})(App);
