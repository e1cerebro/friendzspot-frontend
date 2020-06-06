import React from 'react';

const RequestLoading = ({ type, show, style, className }) => {
  if ('bar' === type && show) {
    return (
      <div className='progress' style={{ ...style }}>
        <div className='indeterminate'></div>
      </div>
    );
  } else {
    return (
      <div
        className={`preloader-wrapper small ${
          show ? 'active' : ''
        } ${className}`}
        style={{ verticalAlign: 'middle', marginLeft: '20px', ...style }}>
        <div className='spinner-layer spinner-red-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
    );
  }
};

export default RequestLoading;
