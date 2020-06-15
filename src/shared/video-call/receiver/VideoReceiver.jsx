import React, { useRef, useEffect } from 'react';
import './video-receiver.style.css';
import { connect } from 'react-redux';
import RequestLoading from '../../request-loading/RequestLoading';

const VideoReceiver = ({ receiverStream, callee_info, partnerConnected }) => {
  const receiverVideoRef = useRef();

  useEffect(() => {
    if (
      receiverStream &&
      Object.keys(receiverStream).length === 0 &&
      receiverStream.constructor === Object
    ) {
    } else if (receiverStream !== null) {
      receiverVideoRef.current.srcObject = receiverStream;
    }
  }, [receiverStream]);

  return (
    <div className='receiver-video'>
      {receiverStream !== null ? (
        <div className='receiver-video-container'>
          <video
            style={{
              display: `${receiverStream === null ? 'hidden' : 'block'}`,
            }}
            ref={receiverVideoRef}
            autoPlay
            playsInline>
            <source
              src='https://archive.org/embed/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4'
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className='waiting-for-connection'>
          <RequestLoading show='true' type='circle' />
          <p className='connecting-text'>Waiting for connection</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    receiverStream: state.call.receiverStream,
    partnerConnected: state.call.partnerConnected,
  };
};

export default connect(mapStateToProps, null)(VideoReceiver);
