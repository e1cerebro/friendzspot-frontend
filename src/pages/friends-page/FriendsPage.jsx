import React, { Fragment } from 'react';
import './friends-page.style.css';
import UserAvaterImage from '../../images/avater.png';
import { connect } from 'react-redux';
import Icon from '../../shared/icon/Icon';

const FriendsPage = ({ currentUser }) => {
  return (
    <Fragment>
      {currentUser && (
        <h1 className='header'>
          <i style={{ fontSize: '42px' }} class='material-icons left'>
            people
          </i>
          <span>{currentUser.firstname}'s Friends</span>
        </h1>
      )}
      <div className='my-friend-list'>
        {currentUser &&
          currentUser.friends.map(friend => {
            return (
              <div className='friend-item'>
                <div className='friend-item__left'>
                  <img src={UserAvaterImage} className='user-avater' alt='' />
                </div>

                <div className='friend-item__right'>
                  <div>
                    <h4 className='name'>
                      {friend.firstname} {friend.lastname}
                    </h4>
                    <p style={{ fontSize: '20px' }} className='sub-text'>
                      <i class='material-icons left'>date_range</i> Joined since{' '}
                      {friend.created_at}
                    </p>
                    <p style={{ fontSize: '20px' }} className='sub-text'>
                      <i class='material-icons left'>people</i>{' '}
                      {friend.friends.length} friends
                    </p>
                  </div>
                  <button
                    class='btn waves-effect   blue darken-4'
                    type='submit'
                    name='action'>
                    Unfriend <i class='material-icons right'>person_outline</i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps)(FriendsPage);
