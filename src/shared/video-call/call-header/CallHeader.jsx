import React from 'react';
import './call-header.style.css';
import RoundImage from '../../round-image/RoundImage';
import { connect } from 'react-redux';
const CallHeader = ({
  name,
  receiverStream,
  incomingStream,
  outGoingCall,
  incomingCallAccepted,
  callee_info,
  photoURL,
}) => {
  let message;

  if (incomingCallAccepted && incomingStream) {
    message = `Call from ${incomingStream.callerName}`;
  } else if (outGoingCall && receiverStream) {
    message =
      receiverStream !== null ? `on call with ${name}` : `calling ${name}...`;
  }

  return (
    <section className='call-header'>
      <div className='caller-photo'>
        <RoundImage size='40px' url={photoURL} />
      </div>
      <div className='receiver info'>
        <span className='caller-name'> {message}</span>{' '}
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    receiverStream: state.call.receiverStream,
    incomingStream: state.call.incomingStream,
    callee_info: state.call.callee_info,
    outGoingCall: state.call.outGoingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
  };
};

export default connect(mapStateToProps, null)(CallHeader);
