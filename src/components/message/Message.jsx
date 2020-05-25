import React, { useEffect, useState, useContext } from 'react';
import './message.style.css';
import SocketContext from '../../contexts/socket-context';

const Message = ({ sender = '', message, time }) => {
  const [data, setData] = useState(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('message', data => {
        console.log('Data: ', data);
        setData(data.body);
      });
    }

    return () => {};
  }, [socket]);

  return (
    <div className={`chat-msg   ${sender}`}>
      <div className='chat-msg-content'>
        <div className='chat-msg-text'>
          {data ? data : 'Tincidunt arcu non sodales😂'}
          <small className='chat-msg-date'>Message sent 2.50pm</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
