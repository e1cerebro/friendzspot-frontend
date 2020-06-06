import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ListItem from '../list-item/ListItem';
import { fetchLastMessagesAction } from '../../../redux/actions/user.actions';
import './user-listings-style.css';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const UserListings = ({ last_messages, fetchLastMessagesAction }) => {
  useEffect(() => {
    fetchLastMessagesAction();
  }, []);

  return (
    <section className='users-collection'>
      <ul className='collection scroll'>
        {last_messages ? (
          last_messages.map(message => {
            return <ListItem key={message.id} message={message} />;
          })
        ) : (
          <RequestLoading type='bar' show={true} />
        )}
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
})(UserListings);
