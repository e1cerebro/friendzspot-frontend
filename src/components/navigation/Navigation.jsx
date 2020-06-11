import React, { useEffect, Fragment } from 'react';
import './navigation.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import { getMyFriendsAction } from '../../redux/actions/user.actions';
import M from 'materialize-css';
import { logoutAction } from '../../redux/actions/auth.actions';
import RoundImage from '../../shared/round-image/RoundImage';
import DefaultCoverImage from '../../images/default-cover-photo.jpg';
import Badge from '../../shared/badge/Badge';

const Navigation = ({
  currentUser,
  unreadMessages,
  logoutAction,
  getMyFriendsAction,
  friends,
}) => {
  let history = useHistory();
  useEffect(() => {
    getMyFriendsAction();
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
  }, [currentUser]);

  const authLogout = () => {
    logoutAction(currentUser.id);
    history.push('/login');
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, { edge: 'left' });
  };

  if (currentUser) {
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
                <Icon color='#fff' className='left' icon='question_answer' />{' '}
                Chat{' '}
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
            {currentUser && (
              <li className='user-account'>
                <NavLink to='/my-profile'>
                  {currentUser.firstname}
                  <Icon color='#fff' className='left' icon='account_circle' />
                </NavLink>
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

          <ul id='slide-out' className='sidenav mobile-side-nav'>
            <li>
              <div className='user-view'>
                <div className='layer-overlay'></div>
                <div className='background' style={defaultCoverImage}>
                  <div className='user-profile-photo'>
                    <RoundImage
                      size='150px'
                      url={currentUser.profilePhotoURL}
                    />
                    <a href='#name'>
                      <span className='white-text name'>
                        {currentUser.firstname}
                      </span>
                    </a>
                    <a href='#email'>
                      <span className='white-text email'>
                        {currentUser.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <NavLink to='/messenger'>
                <Icon color='#fff' className='left' icon='question_answer' />{' '}
                Messenger{' '}
                <Badge
                  color='primary'
                  count={unreadMessages ? unreadMessages.length : 0}
                />
              </NavLink>
            </li>
            <li>
              <NavLink to='/friends'>
                <Icon color='#fff' className='left' icon='people' /> Friends
                <Badge color='danger' count={friends ? friends.length : 0} />
              </NavLink>
            </li>{' '}
            <li>
              <NavLink to='/people'>
                <Icon color='#fff' className='left' icon='public' /> People
              </NavLink>
            </li>{' '}
            {currentUser && (
              <li>
                <NavLink to='/my-profile'>
                  Profile
                  <Icon color='#fff' className='left' icon='account_circle' />
                </NavLink>
              </li>
            )}
            {currentUser ? (
              <li style={{ cursor: 'pointer' }} onClick={authLogout}>
                <a>
                  <Icon color='#fff' className='left' icon='all_out' /> Logout
                </a>
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
  } else {
    return <Fragment></Fragment>;
  }
};

const defaultCoverImage = {
  backgroundImage: `url(${DefaultCoverImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  position: 'relative',
  minHeight: '320px',

  backgroundSize: ' cover',
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
