import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ChatMessages from './pages/chat-messages/chatMessages';
const App = () => {
  return (
    <div class='container'>
      <Navigation />
      <ChatMessages />
    </div>
  );
};

export default App;
