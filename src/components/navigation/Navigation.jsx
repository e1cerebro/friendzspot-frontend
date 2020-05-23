import React from 'react';
import './navigation.css';
import Icon from '../../shared/icon/Icon';

const Navigation = () => {
  return (
    <nav className='friendzspot-navigation'>
      <div class='nav-wrapper'>
        <a href='#' class='brand-logo'>
          FriendzSpot
        </a>
        <ul id='nav-mobile' class='right hide-on-med-and-down'>
          <li>
            <a href='sass.html'>Friends</a>
          </li>{' '}
          <li>
            <a href='sass.html'>Log Out</a>
          </li>
          <li>
            <a href='badges.html'>Login</a>
          </li>
          <li>
            <a href=''>
              <Icon icon='account_circle' />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
