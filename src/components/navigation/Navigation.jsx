import React from 'react';
import './navigation.css';
import { NavLink, Link } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions/user.actions';

const Navigation = ({ currentUser, logoutAction }) => {
  const authLogout = () => {
    logoutAction();
  };
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
          {currentUser ? (
            <li style={{ cursor: 'pointer' }} onClick={authLogout}>
              Logout
            </li>
          ) : (
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
          )}

          {currentUser && (
            <li>
              <Link to=''>
                Welcome {currentUser.firstname}
                {/* <Icon color='#fff' icon='account_circle' /> */}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, { logoutAction })(Navigation);
