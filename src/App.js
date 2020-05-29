import React, { useEffect, useContext } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessages from './pages/chat-messages/chatMessages';
import AuthPage from './pages/user-auth/AuthPage';
import { connect } from 'react-redux';
import { loginTokenAction } from './redux/actions/user.actions';
import People from './pages/people/People';
import SocketContext from './contexts/socket-context';
import {
  initialConnectionEstablishedAction,
  fetchMessagesAction,
  updateUnreadMessagesAction,
} from './redux/actions/chat.actions';
import FriendRequest from './components/friend-requests/FriendRequest';
import FriendsPage from './pages/friends-page/FriendsPage';

const App = ({
  loginTokenAction,
  initialConnectionEstablishedAction,
  updateUnreadMessagesAction,
}) => {
  const { socket, socketID } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      initialConnectionEstablishedAction(socketID);
      socket.on('new message', data => {
        console.log('From APP Data: ', data);
        updateUnreadMessagesAction(data);
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
      <Navigation />
      <Switch>
        <Route exact path='/' component={ChatMessages} />
        <Route exact path='/login' component={AuthPage} />
        <Route exact path='/messenger' component={ChatMessages} />
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
})(App);
