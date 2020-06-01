import React, { useEffect, useRef } from 'react';
import Icon from '../../shared/icon/Icon';
import M from 'materialize-css';

const FloatingButton = props => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const elems = buttonRef.current;
    const instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
    });
  }, []);

  return (
    <div ref={buttonRef} className='fixed-action-btn chat-header-action'>
      <a className='btn-floating btn-large red darken-4'>
        <Icon color='#fff' icon='more_vert' size='30px' />
      </a>

      <ul>{props.children}</ul>
    </div>
  );
};

export default FloatingButton;
