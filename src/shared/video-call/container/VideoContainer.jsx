import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import VideoReceiver from '../receiver/VideoReceiver';
import VideoCaller from '../caller/VideoCaller';
import ActionButtons from '../call-actions/ActionButtons';
import Modal from '../../modal/Modal';
import M from 'materialize-css';
import Peer from 'simple-peer';
import {
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallInitiated,
  audioCallAccepted,
} from '../../../redux/actions/call.action';
import SocketContext from '../../../contexts/socket-context';
import CallHeader from '../call-header/CallHeader';
import './video-container.style.css';

const VideoContainer = ({
  currentUser,
  chattingWith,
  outGoingCall,
  incomingCall,
  incomingCallAccepted,
  audioStream,
  showModal,
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallAccepted,
  audioCallInitiated,
  incomingStream,
}) => {
  const { socket } = useContext(SocketContext);

  let modal;
  let peer;
  useEffect(() => {
    if (showModal) {
      toggleModalDisplay('show');
    } else {
      toggleModalDisplay('hide');
    }
  }, [showModal]);

  useEffect(() => {
    if (outGoingCall) {
      (async () => {
        if (
          audioStream &&
          Object.keys(audioStream).length === 0 &&
          audioStream.constructor === Object
        ) {
          alert('Please set video and audio permission to true');
        } else if (audioStream) {
          toggleModalDisplay('show');
          handlePeerActivities(audioStream);
        }
      })();
    }
  }, [outGoingCall]);

  useEffect(() => {
    if (incomingCallAccepted) {
      (async () => {
        if (
          audioStream &&
          Object.keys(audioStream).length === 0 &&
          audioStream.constructor === Object
        ) {
          alert('Please set video and audio permission to true');
        } else if (audioStream) {
          toggleModalDisplay('show');
          receiverPeer(audioStream);
        }
      })();
    } else {
      toggleModalDisplay('hide');
    }
  }, [incomingCallAccepted]);
  const toggleModalDisplay = (state = 'hide') => {
    var elems = document.getElementById('video-id');
    modal = M.Modal.init(elems, { dismissible: false });

    if ('show' === state) {
      modal.open();
    } else if ('hide' === state) {
      modal.close();
    }
  };

  const handlePeerActivities = stream => {
    //Create our peer connection
    try {
      peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      addCallerStreamAction(stream);

      peer.on('signal', signal => {
        //configure the signal data
        const callInfo = {
          receiverID: chattingWith.id,
          signalData: signal,
          callerId: currentUser.id,
          receiverInfo: chattingWith,
          callerName: currentUser.firstname,
        };

        //dispatch calling action
        audioCallInitiated(callInfo);
      });

      peer.on('stream', stream => {
        addReceiverStreamAction(stream);
      });

      socket.on('callAccepted', signal => {
        if (!signal.renegotiate) {
          peer && peer.signal(signal);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const receiverPeer = audioStream => {
    const receiverPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: audioStream,
    });

    addCallerStreamAction(audioStream);

    receiverPeer.on('signal', signal => {
      //
      const acceptInfo = {
        signal: signal,
        receiverId: incomingStream.callerId,
      };

      setTimeout(() => {
        audioCallAccepted(acceptInfo);
      }, 5000);
    });

    receiverPeer.on('stream', stream => {
      addReceiverStreamAction(stream);
    });

    receiverPeer.signal(incomingStream.signalData);
  };

  return (
    <Modal
      id='video-id'
      footer={<ActionButtons />}
      header={
        <CallHeader
          name={chattingWith.firstname}
          photoURL={chattingWith.profilePhotoURL}
        />
      }
      className='modal-fixed-footer call-modal'>
      <section className='video-convo-container'>
        <VideoCaller />
        <VideoReceiver />
      </section>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    chattingWith: state.chat.chattingWith,
    audioStream: state.call.stream,
    outGoingCall: state.call.outGoingCall,
    incomingCall: state.call.incomingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
    incomingStream: state.call.incomingStream,
    showModal: state.call.showModal,
  };
};

export default connect(mapStateToProps, {
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallInitiated,
  audioCallAccepted,
})(VideoContainer);
