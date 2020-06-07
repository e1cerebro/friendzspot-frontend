import React, { Fragment, useEffect } from 'react';
import './friends-page.style.css';
import { connect } from 'react-redux';
import Icon from '../../shared/icon/Icon';
import FriendInfoBox from '../../components/friends/friend-info-box/FriendInfoBox';
import {
  getMyFriendsAction,
  undoUnfriendAction,
  confirmUnfriendingAction,
} from '../../redux/actions/user.actions';
import Notify from '../../shared/notify/Notify';
import M from 'materialize-css';

const FriendsPage = ({
  currentUser,
  myfriends,
  getMyFriendsAction,
  previousFriendsList,
  lastRemovedFriend,
  undoUnfriendAction,
  confirmUnfriendingAction,
}) => {
  useEffect(() => {
    getMyFriendsAction();
    const el = document.getElementById('tabs');
    var instance = M.Tabs.init(el, {
      swipeable: false,
    });
  }, []);

  const undoFriendUnfriending = () => {
    undoUnfriendAction(lastRemovedFriend.id);
  };
  const confirmUnfriending = () => {
    confirmUnfriendingAction();
  };

  return (
    <Fragment>
      {previousFriendsList && (
        <Notify
          type='primary'
          accept_icon='check'
          reject_icon='close'
          accept_title='Yes please!'
          reject_title='No, thanks'
          message='Do you want to undo this action?'
          acceptAction={undoFriendUnfriending}
          rejectAction={confirmUnfriending}
        />
      )}
      <ul class='tabs tabs-fixed-width' id='tabs'>
        <li class='tab col s3'>
          <a href='#friends'>Friends</a>
        </li>
        <li class='tab col s3'>
          <a href='#blockedfriends'>Blocked Friends</a>
        </li>
        <li class='tab col s3'>
          <a href='#pendingFriendRequest'>Pending Friends Request</a>
        </li>{' '}
        <li class='tab col s3'>
          <a href='#sentFriendRequest'>Sent Friends Request</a>
        </li>
      </ul>
      <div id='friends' class='col s12'>
        <div className='my-friend-list'>
          {myfriends &&
            myfriends.map(friend => {
              return <FriendInfoBox key={friend.id} friend={friend} />;
            })}
        </div>
      </div>
      <div id='blockedfriends' class='col s12'>
        Blocked friends
      </div>
      <div id='pendingFriendRequest' class='col s12'>
        Pending friends Requests
      </div>{' '}
      <div id='sentFriendRequest' class='col s12'>
        Sent friends Requests
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    myfriends: state.app.friends,
    previousFriendsList: state.app.previousFriendsList,
    lastRemovedFriend: state.app.lastRemovedFriend,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  getMyFriendsAction,
  undoUnfriendAction,
  confirmUnfriendingAction,
})(FriendsPage);
