import React from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ChatMessages from './pages/chat-messages/chatMessages';
import { SocketProvider } from './contexts/socket-context';
import AuthPage from './pages/user-auth/AuthPage';

const App = () => {
  return (
    <div className='container'>
      <SocketProvider>
        <Navigation />
        <Switch>
          <Route exact path='/' component={ChatMessages} />
          <Route exact path='/auth' component={AuthPage} />
        </Switch>
      </SocketProvider>
    </div>
  );
};

export default App;
