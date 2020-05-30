import React from 'react';
import './friend-info-box.style.css';
import UserAvaterImage from '../../../images/avater.png';
import { connect } from 'react-redux';
import { unfriendFriendAction } from '../../../redux/actions/user.actions';

const FriendInfoBox = ({ friend, unfriendFriendAction }) => {
  const unFriendUser = () => {
    const answer = window.confirm(
      `Are you sure you want to unfriend  ${friend.firstname} ${friend.lastname}?`
    );

    if (answer) unfriendFriendAction(friend);
  };
  return (
    <div className='friend-item friend-info-box'>
      <div className='friend-item__left'>
        <img src={UserAvaterImage} className='user-avater' alt='' />
      </div>

      <div className='friend-item__right'>
        <div>
          <h4 className='name'>
            {friend.firstname} {friend.lastname}
          </h4>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>date_range</i> Joined since{' '}
            {friend.created_at}
          </p>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>people</i>{' '}
            {friend.friends.length} friends
          </p>
        </div>
        <button
          onClick={unFriendUser}
          className='btn waves-effect   blue darken-4'
          type='submit'
          name='action'>
          Unfriend <i className='material-icons right'>person_outline</i>
        </button>
      </div>
    </div>
  );
};

export default connect(null, { unfriendFriendAction })(FriendInfoBox);
