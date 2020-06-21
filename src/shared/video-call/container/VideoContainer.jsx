import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import Peer from 'simple-peer';
import SocketContext from '../../../contexts/socket-context';
import M from 'materialize-css';

/*--------------------- components ---------------------*/
import Modal from '../../modal/Modal';
import VideoReceiver from '../receiver/VideoReceiver';
import VideoCaller from '../caller/VideoCaller';
import ActionButtons from '../call-actions/ActionButtons';
import CallHeader from '../call-header/CallHeader';

/*--------------------- Actions ---------------------*/
import {
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallInitiated,
  audioCallAccepted,
  endIncomingCallAction,
  endOutgoingCallAction,
  hideCallModalAction,
} from '../../../redux/actions/call.action';

/*--------------------- Styling ---------------------*/
import './video-container.style.css';
import { streamIsValid, toggleModal } from '../../../utils/general';
import { destroyPeer } from '../../../utils/api-settings';

const VideoContainer = ({
  currentUser,
  chattingWith,
  outGoingCall,
  incomingCallAccepted,
  audioStream,
  showModal,
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallAccepted,
  audioCallInitiated,
  incomingStream,
  endOutgoingCallAction,
  endIncomingCallAction,
  hideCallModalAction,
}) => {
  const [outgoingPeerStatus, setOutgoingPeerStatus] = useState(null);
  const [incomingPeerStatus, setIncomingPeerStatus] = useState(null);
  const [requestMessage, setRequestMessage] = useState(null);
  const { socket, socketID } = useContext(SocketContext);

  let modal;

  useEffect(() => {
    if (showModal) {
      toggleModal('video-id', 'show');
    } else {
      toggleModal('video-id', 'hide');
    }
  }, [showModal]);

  useEffect(() => {
    if (outGoingCall) {
      (async () => {
        if (!streamIsValid(audioStream)) {
          endOutgoingCallAction();
          alert(
            'CALL COULD NOT BE COMPLETED!\nPlease allow app to access your audio and video stream before making a call!'
          );
        } else if (audioStream) {
          toggleModal('video-id', 'show');
          createInitiatorPeerConnection(audioStream);
        }
      })();
    }
  }, [outGoingCall]);

  useEffect(() => {
    if (incomingCallAccepted) {
      (async () => {
        if (!streamIsValid(audioStream)) {
          alert(
            'CALL COULD NOT BE COMPLETED!\nPlease allow app to access your audio and video stream before making a call!'
          );
          endIncomingCallAction();
        } else if (audioStream) {
          toggleModal('video-id', 'show');
          receiverPeerActivities(audioStream);
        }
      })();
    } else {
      toggleModal('video-id', 'hide');
    }
  }, [incomingCallAccepted]);

  // const toggleModalDisplay = (state = 'hide') => {
  //   var elems = document.getElementById('video-id');
  //   modal = M.Modal.init(elems, { dismissible: false });

  //   if ('show' === state) {
  //     modal.open();
  //   } else if ('hide' === state) {
  //     modal.close();
  //   }
  // };

  const modalClose = () => {
    hideCallModalAction();
    toggleModal('video-id', 'hide');
  };

  const createInitiatorPeerConnection = stream => {
    //Create our peer connection
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      setOutgoingPeerStatus(peer);
      addCallerStreamAction(stream);

      peer.on('signal', signal => {
        //configure the signal data
        const callInfo = {
          receiverID: chattingWith.id,
          signalData: signal,
          callerId: currentUser.id,
          receiverInfo: chattingWith,
          callerName: currentUser.firstname,
          socketID: socketID,
        };

        setRequestMessage(null);
        audioCallInitiated(callInfo);

        //End the call if the user doesnt pick the call after 2 mins
        setTimeout(() => {
          endInitiatorCall(peer);
          endOutgoingCallAction(chattingWith.id);
        }, 20000);
      });

      peer.on('stream', stream => {
        addReceiverStreamAction(stream);
      });

      peer.on('close', data => {
        endInitiatorCall(peer);
      });

      peer.on('connect', () => {
        console.log('CONNECTED!');
        setRequestMessage(null);
      });

      socket.on('callAccepted', signal => {
        if (!signal.renegotiate && peer.readable) {
          peer.signal(signal);
        }
      });

      socket.on('receiverNotAvailable', message => {
        setRequestMessage(message);
        endInitiatorCall(peer);
      });

      socket.on('callEnded', data => {
        endInitiatorCall(peer);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const receiverPeerActivities = audioStream => {
    const receiverPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: audioStream,
    });

    setIncomingPeerStatus(receiverPeer);

    addCallerStreamAction(audioStream);

    receiverPeer.on('signal', signal => {
      const acceptInfo = {
        signal: signal,
        receiverId: incomingStream.callerId,
      };
      if (!signal.renegotiate) {
        audioCallAccepted(acceptInfo);
      }
    });

    receiverPeer.on('close', () => {
      if (receiverPeer) {
        destroyPeer(receiverPeer);
      }
      setIncomingPeerStatus('closed');
      setTimeout(() => {
        setIncomingPeerStatus(null);
        endIncomingCallAction();
      }, 3000);
    });

    receiverPeer.on('stream', stream => {
      addReceiverStreamAction(stream);
    });

    receiverPeer.signal(incomingStream.signalData);

    socket.on('callEnded', data => {
      if (receiverPeer) {
        destroyPeer(receiverPeer);
      }
      setIncomingPeerStatus('closed');
      setTimeout(() => {
        setIncomingPeerStatus(null);
        endIncomingCallAction();
      }, 3000);
    });
  };

  const endInitiatorCall = (peer, message) => {
    if (peer) {
      destroyPeer(peer);
    }
    setOutgoingPeerStatus('closed');
    setTimeout(() => {
      setOutgoingPeerStatus(null);
      endOutgoingCallAction();
    }, 3000);
  };

  return (
    <Modal
      modalClose={modalClose}
      id='video-id'
      footer={<ActionButtons />}
      header={
        <CallHeader
          name={chattingWith ? chattingWith.firstname : ''}
          photoURL={chattingWith ? chattingWith.profilePhotoURL : ''}
        />
      }
      className='modal-fixed-footer call-modal'>
      <section className='video-convo-container'>
        <VideoCaller />
        <VideoReceiver requestMessage={requestMessage} />
        {incomingPeerStatus === 'closed' && (
          <div className='call-ended'>Call Ended</div>
        )}{' '}
        {outgoingPeerStatus === 'closed' && (
          <div className='call-ended'>Call Ended</div>
        )}
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
  endOutgoingCallAction,
  endIncomingCallAction,
  hideCallModalAction,
})(VideoContainer);
