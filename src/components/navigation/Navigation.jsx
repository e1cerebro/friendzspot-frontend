import React, { useEffect } from 'react';
import './navigation.css';
import { NavLink, Link } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import {
  logoutAction,
  getMyFriendsAction,
} from '../../redux/actions/user.actions';

const Navigation = ({
  currentUser,
  unreadMessages,
  logoutAction,
  getMyFriendsAction,
  friends,
}) => {
  useEffect(() => {
    getMyFriendsAction();
  }, []);
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
          <li style={{ backgroundColor: '#b30c0c' }}>
            <NavLink to='/messenger'>
              <Icon color='#fff' className='left' icon='question_answer' />{' '}
              Messenger{' '}
              <span className='small badge circle-badge blue accent-4'>
                {unreadMessages && unreadMessages.length}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/friends'>
              <Icon color='#fff' className='left' icon='people' /> Friends
              <span className='small badge circle-badge amber  '>
                {friends && friends.length}
              </span>
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to='/people'>
              <Icon color='#fff' className='left' icon='public' /> People
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to='/friend-requests'>
              <Icon color='#fff' className='left' icon='person_add' /> Friend
              Requests <span className='new badge blue'>4</span>
            </NavLink>
          </li>
          {currentUser && (
            <li className='user-account'>
              <Link to=''>
                {currentUser.firstname}
                <Icon color='#fff' className='left' icon='account_circle' />
              </Link>
            </li>
          )}
          {currentUser ? (
            <li style={{ cursor: 'pointer' }} onClick={authLogout}>
              Logout
            </li>
          ) : (
            <li>
              <NavLink to='/login'>Login</NavLink>
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
    unreadMessages: state.chat.unreadMessages,
    friends: state.app.friends,
  };
};

export default connect(mapStateToProps, { logoutAction, getMyFriendsAction })(
  Navigation
);
