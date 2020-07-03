import React, { Fragment, useState } from 'react';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import { connect } from 'react-redux';
import {
  endOutgoingCallAction,
  endIncomingCallAction,
  updateAudioStreamAction,
} from '../../../redux/actions/call.action';
import {
  get_audio_permission,
  stopVideoOnly,
} from '../../../utils/api-settings';
const ActionButtons = ({
  outGoingCall,
  receiver_info,
  incomingCallAccepted,
  endOutgoingCallAction,
  endIncomingCallAction,
  updateAudioStreamAction,
  incomingStream,
  stream,
}) => {
  const endCall = () => {
    if (outGoingCall) {
      endOutgoingCallAction(receiver_info.receiverID);
    } else if (incomingCallAccepted) {
      endIncomingCallAction(incomingStream.callerId);
    }
  };

  return (
    <Fragment>
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
  updateAudioStreamAction,
})(ActionButtons);
