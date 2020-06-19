import React, { useEffect, useState, useContext } from 'react';
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
  endIncomingCallAction,
  endOutgoingCallAction,
  hideCallModalAction,
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
          receiverPeerActivities(audioStream);
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

  const modalClose = () => {
    hideCallModalAction();
    toggleModalDisplay('hide');
  };

  const handlePeerActivities = stream => {
    //Create our peer connection
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      console.log('Caller Peer created:');
      console.log(peer);

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
        //dispatch calling action
        audioCallInitiated(callInfo);
      });

      peer.on('stream', stream => {
        addReceiverStreamAction(stream);
      });

      peer.on('close', data => {
        if (peer) {
          destroyPeer(peer);
        }
        setTimeout(() => {
          endOutgoingCallAction();
          console.log('Receiver ended their call');
        }, 2000);
      });

      peer.on('connect', () => {
        console.log('CONNECTED!');
        setRequestMessage(null);
      });

      socket.on('callAccepted', signal => {
        console.log('SIGNAL FROM USER!');
        console.log(peer);
        if (!signal.renegotiate && peer.readable) {
          peer.signal(signal);
        }
      });

      // socket.on('receiverNotAvailable', message => {
      //   setRequestMessage(message);
      //   if (peer) {
      //     destroyPeer(peer);
      //   }
      //   setTimeout(() => {
      //     endOutgoingCallAction();
      //   }, 2000);
      // });

      socket.on('callEnded', data => {
        console.log('Receiver ended call for ' + data);

        if (peer) {
          destroyPeer(peer);
        }
        setOutgoingPeerStatus('closed');
        setTimeout(() => {
          setOutgoingPeerStatus(null);
          endOutgoingCallAction();
        }, 3000);
      });
    } catch (error) {
      console.log(error);
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
      //
      const acceptInfo = {
        signal: signal,
        receiverId: incomingStream.callerId,
      };

      audioCallAccepted(acceptInfo);
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
      console.log('Caller ended call for ' + data);

      if (receiverPeer) {
        destroyPeer(receiverPeer);
      }
      console.log('Receiver: ', receiverPeer);
      setIncomingPeerStatus('closed');
      setTimeout(() => {
        setIncomingPeerStatus(null);
        endIncomingCallAction();
      }, 3000);
    });
  };

  const destroyPeer = peer => {
    if (peer) {
      peer.destroy();
      peer = null;
    }
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
          <div claclassNamess='call-ended'>Call Ended</div>
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
