import React, { Fragment, useEffect } from 'react';
import './friends-page.style.css';
import { connect } from 'react-redux';
import Icon from '../../shared/icon/Icon';
import FriendInfoBox from '../../components/friends/friend-info-box/FriendInfoBox';
import {
  getMyFriendsAction,
  undoUnfriendAction,
} from '../../redux/actions/user.actions';
import Notify from '../../shared/notify/Notify';

const FriendsPage = ({
  currentUser,
  myfriends,
  getMyFriendsAction,
  previousFriendsList,
  lastRemovedFriend,
  undoUnfriendAction,
}) => {
  useEffect(() => {
    getMyFriendsAction();
  }, []);

  const undoFriendUnfriending = () => {
    undoUnfriendAction(lastRemovedFriend.id);
  };

  return (
    <Fragment>
      {currentUser && (
        <h1 className='header'>
          <Icon color='#134b90' className='left' icon={` people`} size='40px' />
          <span>{currentUser.firstname}'s Friends</span>
        </h1>
      )}
      {previousFriendsList && (
        <Notify
          type='primary'
          icon='refresh'
          action_title='Undo Now'
          message='Do you want to undo this action?'
          clickBubbleAction={undoFriendUnfriending}
        />
      )}
      <div className='my-friend-list'>
        {myfriends &&
          myfriends.map(friend => {
            return <FriendInfoBox key={friend.id} friend={friend} />;
          })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    myfriends: state.app.friends,
    previousFriendsList: state.app.previousFriendsList,
    lastRemovedFriend: state.app.lastRemovedFriend,
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, {
  getMyFriendsAction,
  undoUnfriendAction,
})(FriendsPage);
