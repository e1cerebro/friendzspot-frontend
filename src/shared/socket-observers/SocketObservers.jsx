import React, { useEffect, useContext, Fragment } from 'react';
import { connect } from 'react-redux';
import SocketContext from '../../contexts/socket-context';
import {
  initialConnectionEstablishedAction,
  fetchLastMessagesAction,
  updateUnreadMessagesAction,
  receivedNewMessageAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
} from '../../redux/actions/chat.actions';
import {
  updateTypingStartedAction,
  updateTypingStoppedAction,
} from '../../redux/actions/reaction.actions';
import messageURL from '../../sounds/message_received2.mp3';
import userTypingSound from '../../sounds/user_typing.mp3';
import newNotificationSound from '../../sounds/stuffed-and-dropped.mp3';
import { get_audio_permission } from '../../utils/api-settings';
import { startIncomingCallAction } from '../../redux/actions/call.action';
import M from 'materialize-css';

const SocketObservers = props => {
  const {
    audioRef,
    initialConnectionEstablishedAction,
    fetchLastMessagesAction,
    updateUnreadMessagesAction,
    receivedNewMessageAction,
    updateTypingStartedAction,
    updateTypingStoppedAction,
    startIncomingCallAction,
    updateUsersOnlineAction,
    removeUsersOnlineAction,
  } = props;

  const { socket, socketID } = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      initialConnectionEstablishedAction(socketID);
      socket.on('new message', data => {
        try {
          fetchLastMessagesAction();
          updateUnreadMessagesAction(data);
          receivedNewMessageAction(data);
          audioRef.current.src = messageURL;
          audioRef.current.play();
        } catch (error) {
          console.log(`Could not retreive new messages ${error.message}`);
        }
      });

      socket.on('started typing', userId => {
        try {
          updateTypingStartedAction(userId);
          audioRef.current.src = userTypingSound;
          audioRef.current.volume = 0.5;
          audioRef.current.play();
        } catch (error) {}
      });

      socket.on('stopped typing', userId => {
        try {
          updateTypingStoppedAction(userId);
        } catch (error) {}
      });

      socket.on('incomingCall', async incomingCallData => {
        const browerMediaStream = await get_audio_permission();
        startIncomingCallAction(incomingCallData);
      });

      socket.on('user connected', userId => {
        updateUsersOnlineAction(userId);
      });

      socket.on('notification', message => {
        M.toast({ html: message });
        audioRef.current.src = newNotificationSound;
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      });

      socket.on('user disconnected', userId => {
        removeUsersOnlineAction(userId);
      });
    }
    return () => {};
  }, [socket]);

  return <Fragment></Fragment>;
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {
  initialConnectionEstablishedAction,
  fetchLastMessagesAction,
  updateUnreadMessagesAction,
  receivedNewMessageAction,
  updateTypingStartedAction,
  updateTypingStoppedAction,
  startIncomingCallAction,
  updateUsersOnlineAction,
  removeUsersOnlineAction,
})(SocketObservers);
