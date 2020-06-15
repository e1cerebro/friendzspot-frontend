import React, { Fragment } from 'react';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import { connect } from 'react-redux';
import {
  endOutgoingCallAction,
  endIncomingCallAction,
} from '../../../redux/actions/call.action';

const ActionButtons = ({
  outGoingCall,
  incomingCallAccepted,
  endOutgoingCallAction,
  endIncomingCallAction,
}) => {
  const endCall = () => {
    if (outGoingCall) {
      endOutgoingCallAction();
    } else if (incomingCallAccepted) {
      endIncomingCallAction();
    }
  };

  return (
    <Fragment>
      <Button
        type='button'
        name='unfriend-btn'
        color='btn-danger'
        buttonCallback={endCall}
        style={{ marginRight: '10px' }}>
        END CALL
        <Icon className='right' icon='stop' color='neutral' size='21px' />
      </Button>
      <Button type='button' name='unfriend-btn' color='btn-warning'>
        MUTE CALL
        <Icon className='right' icon='volume_off' color='neutral' size='21px' />
      </Button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    outGoingCall: state.call.outGoingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
  };
};

export default connect(mapStateToProps, {
  endOutgoingCallAction,
  endIncomingCallAction,
})(ActionButtons);
