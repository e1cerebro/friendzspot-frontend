import React, { useEffect, useContext, useRef, useState } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessagesPage from './pages/chat-messages/ChatMessagesPage';
import AuthPage from './pages/user-auth/AuthPage';
import { connect } from 'react-redux';
import {
  loginTokenAction,
  fetchLastMessagesAction,
} from './redux/actions/user.actions';
import People from './pages/people/People';
import SocketContext from './contexts/socket-context';
import {
  initialConnectionEstablishedAction,
  fetchMessagesAction,
  updateUnreadMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
} from './redux/actions/chat.actions';
import FriendRequest from './components/friend-requests/FriendRequest';
import FriendsPage from './pages/friends-page/FriendsPage';
import messageURL from './sounds/message_received2.mp3';

const App = ({
  currentUser,
  chattingWith,
  loginTokenAction,
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
  fetchMessagesAction,
  fetchLastMessagesAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
}) => {
  const { socket, socketID } = useContext(SocketContext);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (socket) {
      initialConnectionEstablishedAction(socketID);
      socket.on('new message', data => {
        console.log('From APP Data: ', data);
        fetchLastMessagesAction();
        updateUnreadMessagesAction(data);
        audioRef.current.play();
      });

      socket.on('user connected', userId => {
        console.log('user connected', userId);
        updateUsersOnlineAction(userId);
      });

      socket.on('user disconnected', userId => {
        console.log('user disconnected', userId);
        removeUsersOnlineAction(userId);
      });
    }
    return () => {};
  }, [socket]);

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      loginTokenAction(userToken);
    }
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
        <Route exact path='/friend-requests' component={FriendRequest} />
        <Route exact path='/friends' component={FriendsPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.app.currentUser,
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
})(App);
