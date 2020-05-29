import React, { useEffect } from 'react';
import ListItem from '../list-item/ListItem';
import './user-listings-style.css';
import { connect } from 'react-redux';
import { getMyFriendsAction } from '../../redux/actions/user.actions';

const UserListings = ({ friends, getMyFriendsAction }) => {
  useEffect(() => {
    getMyFriendsAction();
  }, []);

  return (
    <section className='users-collection'>
      <ul className='collection scroll'>
        {friends &&
          friends.map(user => {
            return <ListItem key={user.id} user={user} />;
          })}
      </ul>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    friends: state.app.friends,
  };
};

export default connect(mapStateToProps, { getMyFriendsAction })(UserListings);
