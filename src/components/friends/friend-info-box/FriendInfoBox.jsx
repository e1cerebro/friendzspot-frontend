import React from 'react';
import './friend-info-box.style.css';
import UserAvaterImage from '../../../images/avater.png';
import { connect } from 'react-redux';
import { unfriendFriendAction } from '../../../redux/actions/user.actions';
import Icon from '../../../shared/icon/Icon';
import { Link, useHistory } from 'react-router-dom';
import { userItemClicked } from '../../../redux/actions/chat.actions';
import { GetTimeAgo } from '../../../utils/format-time';
import { CHAT_API_URL } from '../../../utils/api-settings';

const FriendInfoBox = ({ friend, userItemClicked, unfriendFriendAction }) => {
  let history = useHistory();
  const unFriendUser = () => {
    const answer = window.confirm(
      `Are you sure you want to unfriend  ${friend.firstname} ${friend.lastname}?`
    );

    if (answer) unfriendFriendAction(friend);
  };

  const goToMessenger = () => {
    userItemClicked(friend);
    history.push('/messenger');
  };

  const getImageURL = friend => {
    if (friend.profilePhotoURL) {
      return CHAT_API_URL + '/' + friend.profilePhotoURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  return (
    <div className='friend-item friend-info-box hoverable scale-transition scale-in'>
      <div className='friend-item__left'>
        <div
          className='circle'
          style={{
            height: '200px',
            width: '200px',
            border: '6px solid rgb(228, 225, 225)',
            backgroundImage: `url(${getImageURL(friend)})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: ' no-repeat',
          }}></div>
      </div>

      <div className='friend-item__right'>
        <div>
          <h4 className='name'>
            {friend.firstname} {friend.lastname}
          </h4>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>date_range</i> Joined since{' '}
            {GetTimeAgo(friend.created_at)}
          </p>
          <p style={{ fontSize: '20px' }} className='sub-text'>
            <i className='material-icons left'>people</i>{' '}
            {friend.friends.length} friends
          </p>

          {/* <Link  to='/messenger'> */}
          <p onClick={goToMessenger} className='start-chatting'>
            <Icon
              color='#e50303'
              className='left'
              icon='question_answer'
              size='27px'
            />{' '}
            <span> Send Message</span>
          </p>
          {/* </Link> */}
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

export default connect(null, { unfriendFriendAction, userItemClicked })(
  FriendInfoBox
);
