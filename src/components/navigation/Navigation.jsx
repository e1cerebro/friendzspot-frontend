import React, { useEffect } from 'react';
import './navigation.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import { getMyFriendsAction } from '../../redux/actions/user.actions';
import M from 'materialize-css';
import { logoutAction } from '../../redux/actions/auth.actions';

const Navigation = ({
  currentUser,
  unreadMessages,
  logoutAction,
  getMyFriendsAction,
  friends,
}) => {
  useEffect(() => {
    getMyFriendsAction();
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
  }, []);
  const authLogout = () => {
    logoutAction(currentUser.id);
  };
  return (
    <nav className='friendzspot-navigation'>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          FriendzSpot
        </Link>
        <a
          href='#'
          data-target='slide-out'
          className='sidenav-trigger right show-on-med-and-down'>
          <i className='material-icons'>menu</i>
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li style={{ backgroundColor: '#b30c0c' }}>
            <NavLink to='/messenger'>
              <Icon color='#fff' className='left' icon='question_answer' /> Chat{' '}
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
              <Icon color='#fff' className='left' icon='person_add' /> Requests{' '}
              <span className='small badge circle-badge amber  '>
                {friends && friends.length}
              </span>
            </NavLink>
          </li>
          {currentUser && (
            <li className='user-account'>
              <Link to='/my-profile'>
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

        <ul id='slide-out' className='sidenav'>
          <li>
            <div className='user-view'>
              <div className='background'>
                <img src='images/office.jpg' />
              </div>
              <a href='#user'>
                <img className='circle' src='images/yuna.jpg' />
              </a>
              <a href='#name'>
                <span className='white-text name'>John Doe</span>
              </a>
              <a href='#email'>
                <span className='white-text email'>jdandturk@gmail.com</span>
              </a>
            </div>
          </li>
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
              Requests{' '}
              <span className='small badge circle-badge amber  '>
                {friends && friends.length}
              </span>
            </NavLink>
          </li>
          {currentUser && (
            <li className='user-account'>
              <Link to='/my-profile'>
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
    currentUser: state.auth.currentUser,
    unreadMessages: state.chat.unreadMessages,
    friends: state.app.friends,
  };
};

export default connect(mapStateToProps, { logoutAction, getMyFriendsAction })(
  Navigation
);
