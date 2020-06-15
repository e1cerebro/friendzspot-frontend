import React, { useEffect, Fragment } from 'react';
import Modal from '../../modal/Modal';
import { connect } from 'react-redux';
import M from 'materialize-css';
import './icoming-call.styles.css';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import RoundImage from '../../round-image/RoundImage';
import { IncomingCallAcceptedAction } from '../../../redux/actions/call.action';

const IncomingCall = ({
  incomingCall,
  incomingStream,
  incomingCallAccepted,
  IncomingCallAcceptedAction,
}) => {
  let modal;
  useEffect(() => {
    var elem = document.getElementById('incoming-call-alert');
    modal = M.Modal.init(elem, { dismissible: false });
    if (incomingCall && incomingStream) {
      modal.open();
    }
  }, [incomingCall, incomingStream]);

  useEffect(() => {
    var elem = document.getElementById('incoming-call-alert');
    modal = M.Modal.init(elem, { dismissible: false });
    if (incomingCallAccepted) {
      modal.close();
    }
  }, [incomingCallAccepted]);

  const acceptCall = () => {
    IncomingCallAcceptedAction();
  };

  const declineCall = () => {
    console.log('Accept call');
  };

  if (incomingStream !== null) {
    return (
      <Modal id='incoming-call-alert'>
        <section className='incoming-call-alert-section'>
          <div className='incoming-call-alert-section-title'>
            <span>Incoming call from {incomingStream.callerName}</span>
          </div>
          <div className='incoming-call-alert-section-image'>
            <RoundImage size='150px' />
          </div>
          <div className='incoming-call-alert-section-buttons'>
            <Button
              type='button'
              name='unfriend-btn'
              color='btn-success'
              buttonCallback={acceptCall}
              style={{ marginRight: '10px' }}>
              ACCEPT
              <Icon
                className='right'
                icon='phone'
                color='neutral'
                size='21px'
              />
            </Button>
            <Button
              type='button'
              name='unfriend-btn'
              color='btn-danger'
              buttonCallback={declineCall}>
              DECLINE
              <Icon className='right' icon='stop' color='neutral' size='21px' />
            </Button>
          </div>
        </section>
      </Modal>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const mapStateToProps = state => {
  return {
    incomingCall: state.call.incomingCall,
    incomingStream: state.call.incomingStream,
    incomingCallAccepted: state.call.incomingCallAccepted,
  };
};

export default connect(mapStateToProps, { IncomingCallAcceptedAction })(
  IncomingCall
);
