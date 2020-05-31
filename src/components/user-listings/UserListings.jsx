import React, { useEffect } from 'react';
import ListItem from '../list-item/ListItem';
import './user-listings-style.css';
import { connect } from 'react-redux';
import {
  getMyFriendsAction,
  fetchLastMessagesAction,
} from '../../redux/actions/user.actions';

const UserListings = ({
  last_messages,
  getMyFriendsAction,
  fetchLastMessagesAction,
}) => {
  useEffect(() => {
    //getMyFriendsAction();
    fetchLastMessagesAction();
  }, []);

  return (
    <section className='users-collection'>
      <ul className='collection scroll'>
        {last_messages &&
          last_messages.map(message => {
            return <ListItem key={message.id} message={message} />;
          })}
      </ul>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    last_messages: state.app.last_messages,
  };
};

export default connect(mapStateToProps, {
  fetchLastMessagesAction,
  getMyFriendsAction,
})(UserListings);
