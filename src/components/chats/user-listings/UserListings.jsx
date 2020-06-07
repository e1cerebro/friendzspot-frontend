import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ListItem from '../list-item/ListItem';
import './user-listings-style.css';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import { fetchLastMessagesAction } from '../../../redux/actions/chat.actions';
const UserListings = ({
  last_messages,
  currentUser,
  fetchLastMessagesAction,
}) => {
  useEffect(() => {
    fetchLastMessagesAction();
  }, []);

  const userID = currentUser.id;
  const senderCollection = [];
  const receiverCollection = [];

  const userCollection = [];

  return (
    <section className='users-collection'>
      <ul className='collection scroll'>
        {last_messages ? (
          last_messages.map(message => {
            let senderID = message.sender.id;
            let receiverID = message.receiver.id;
            let id;

            if (userID === senderID) {
              id = message.receiver.id;
              if (!userCollection.includes(id)) {
                userCollection.push(id);
                return <ListItem key={message.id} message={message} />;
              }
            } else if (userID !== senderID) {
              id = message.sender.id;
              if (!userCollection.includes(id)) {
                userCollection.push(id);
                return <ListItem key={message.id} message={message} />;
              }
            }
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
    last_messages: state.chat.last_messages,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchLastMessagesAction,
})(UserListings);
