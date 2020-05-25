import React, { useEffect } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessages from './pages/chat-messages/chatMessages';
import { SocketProvider } from './contexts/socket-context';
import AuthPage from './pages/user-auth/AuthPage';
import { connect } from 'react-redux';
import { loginTokenAction } from './redux/actions/user.actions';

const App = ({ loginTokenAction }) => {
  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      loginTokenAction(userToken);
    }
  }, []);
  return (
    <div className='container'>
      <SocketProvider>
        <Navigation />
        <Switch>
          <Route exact path='/' component={ChatMessages} />
          <Route exact path='/login' component={AuthPage} />
        </Switch>
      </SocketProvider>
    </div>
  );
};

export default connect(null, { loginTokenAction })(App);
