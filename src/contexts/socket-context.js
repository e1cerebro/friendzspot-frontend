import React, { useEffect, useState, createContext } from 'react';
import socketIOClient from 'socket.io-client';
import { CHAT_API_URL } from '../utils/api-settings';

const SocketContext = createContext();
const ENDPOINT = CHAT_API_URL;

export const SocketProvider = props => {
  const [socketInstance, setSocketInstance] = useState(null);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocketInstance(socket);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketInstance,
      }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
