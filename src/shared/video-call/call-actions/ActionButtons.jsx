import React, { Fragment, useState } from 'react';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import { connect } from 'react-redux';
import {
  endOutgoingCallAction,
  endIncomingCallAction,
} from '../../../redux/actions/call.action';

const ActionButtons = ({
  outGoingCall,
  receiver_info,
  incomingCallAccepted,
  endOutgoingCallAction,
  endIncomingCallAction,
  incomingStream,
  stream,
}) => {
  const endCall = () => {
    if (outGoingCall) {
      endOutgoingCallAction(receiver_info.receiverID);
      //console.log(receiver_info.receiverID);
    } else if (incomingCallAccepted) {
      endIncomingCallAction(incomingStream.callerId);
      // console.log(incomingStream.callerId);
    }
  };

  const stopWebCam = () => {};

  const startWebCam = () => {};
  return (
    <Fragment>
      <Button
        className='btn-floating'
        type='button'
        name='unfriend-btn'
        color='btn-primary'
        buttonCallback={stopWebCam}
        style={{ marginRight: '10px' }}>
        <Icon className='' icon='videocam_off' color='neutral' size='21px' />
      </Button>
      <Button
        className='btn-floating'
        type='button'
        name='unfriend-btn'
        color='btn-primary'
        buttonCallback={startWebCam}
        style={{ marginRight: '10px' }}>
        <Icon className='' icon='videocam' color='neutral' size='21px' />
      </Button>
      <Button
        className='btn-floating'
        type='button'
        name='unfriend-btn'
        color='btn-warning'
        style={{ marginRight: '10px' }}>
        <Icon className='' icon='mic_off' color='neutral' size='21px' />
      </Button>
      <Button
        className='btn-floating'
        type='button'
        name='unfriend-btn'
        color='btn-danger'
        buttonCallback={endCall}>
        <Icon className='' icon='call_end' color='neutral' size='21px' />
      </Button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    outGoingCall: state.call.outGoingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
    stream: state.call.stream,
    incomingStream: state.call.incomingStream,
    receiver_info: state.call.receiver_info,
  };
};

export default connect(mapStateToProps, {
  endOutgoingCallAction,
  endIncomingCallAction,
})(ActionButtons);
