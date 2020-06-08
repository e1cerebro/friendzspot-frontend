import React from 'react';
import './notfound.style.css';
import Icon from '../icon/Icon';

const NotFound = () => {
  return (
    <section className='not-found-section'>
      <div className='content'>
        <Icon color='danger' icon='bug_report' size='90px' />
        <h4>NOT FOUND</h4>
      </div>
    </section>
  );
};

export default NotFound;
