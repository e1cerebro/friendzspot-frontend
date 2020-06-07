import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import M from 'materialize-css';

const Modal = () => {
  //   useEffect(() => {
  //     var elems = document.getElementById('modal');
  //     M.Modal.init(elems);
  //   }, []);

  return createPortal(
    <div id='modal' className='modal'>
      <div className='modal-content'>
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div className='modal-footer'>
        <a href='/' className='modal-close waves-effect waves-green btn-flat'>
          Agree
        </a>
      </div>
    </div>,
    document.getElementById('modal-portal')
  );
};

export default Modal;
