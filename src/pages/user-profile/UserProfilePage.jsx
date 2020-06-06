import React, { Fragment } from 'react';
import UserProfileBanner from '../../components/users/user-profile-banner/UserProfileBanner';
import UserProfileHeader from '../../components/users/user-profile-header/UserProfileHeader';
import './user-profile-page.style.css';
import StatItem from '../../shared/stat-item/StatItem';
import Divider from '../../shared/divider/Divider';
import UpdateForm from '../../components/users/update-form/UpdateForm';
import { connect } from 'react-redux';
import Loading from '../../shared/loading/loading';

const UserProfilePage = ({
  currentUser,
  friends,
  friend_requests,
  unreadMessages,
}) => {
  if (currentUser) {
    return (
      <Fragment>
        <div className='row'>
          <div className='col s12 p-0'>
            <UserProfileBanner />
          </div>
          <div className='col s12 p-0'>
            <UserProfileHeader />
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m4 mb-2 '>
            <div className='stat-collections'>
              <StatItem
                count={friends ? friends.length : 0}
                icon='people'
                color='warning'
                title='Friends'
              />
              <StatItem
                count={friend_requests ? friend_requests.length : 0}
                icon='person_add'
                color='primary'
                title='Friend Requests'
              />
              <StatItem
                icon='question_answer'
                color='danger'
                count={unreadMessages ? unreadMessages.length : 0}
                title='Unread Messages'
              />
            </div>
          </div>
          <div className='col s12 m8 mb-2'>
            <div className='user-update-form'>
              <h3 className='sub-heading'>Update User Info</h3>
              <Divider color='danger' size='large' />
              <div className='row'>
                <UpdateForm />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.app.currentUser,
    friends: state.app.friends,
    friend_requests: state.app.friend_requests,
    unreadMessages: state.chat.unreadMessages,
  };
};
export default connect(mapStateToProps)(UserProfilePage);
