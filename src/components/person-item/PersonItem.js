import React from 'react';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import { sendRequestAction } from '../../redux/actions/user.actions';
const PersonItem = ({ person, currentUser, sendRequestAction }) => {
  const sendRequest = event => {
    event.preventDefault();
    sendRequestAction({
      receiver: person.id,
      notification_type: 'friend_request',
    });
  };
  return (
    <li className='collection-item avatar'>
      <i className='material-icons circle'>folder</i>
      <span className='title'>
        {person.firstname} {person.lastname}
      </span>

      <a onClick={sendRequest} href='/' className='secondary-content'>
        <i className='material-icons circle red'>send</i> Connect With
      </a>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.app.currentUser,
  };
};

export default connect(mapStateToProps, { sendRequestAction })(PersonItem);
