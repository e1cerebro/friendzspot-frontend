import React from 'react';
import './navigation.css';
import { NavLink, Link } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';

const Navigation = () => {
  return (
    <nav className='friendzspot-navigation'>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          FriendzSpot
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink to='/friends'>Friends</NavLink>
          </li>

          <li>
            <NavLink to='/auth'>Auth</NavLink>
          </li>

          <li>
            <a href=''>
              <Icon color='#fff' icon='account_circle' />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
