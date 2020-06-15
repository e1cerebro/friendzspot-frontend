import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.style.css';
import Icon from '../icon/Icon';
const Modal = ({ id, footer, bgImage, className, header, ...props }) => {
  return createPortal(
    <div
      style={{ ...bgImage }}
      id={id}
      className={`modal ${className ? className : ''} `}>
      <div className='modal-header'>
        <div className='modal-close-container'>
          <a className='modal-close left waves-effect waves-green btn-flat close-button'>
            <Icon
              icon='arrow_back'
              style={{ marginRight: '5px' }}
              size='22px'
              color='neutral'
              className='left'
            />{' '}
          </a>
        </div>
        {header}
      </div>
      <div className='modal-content'>{props.children}</div>
      <div className='modal-footer'>{footer}</div>
    </div>,
    document.getElementById('modal-portal')
  );
};

export default Modal;
