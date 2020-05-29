import React, { Fragment } from 'react';
import Image from '../../shared/image/Image';
import './chat-header.style.css';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
const ChatHeader = ({ chattingWith }) => {
  if (!chattingWith) {
    return <Fragment></Fragment>;
  }
  return (
    <div className='chat-panel__header'>
      <div className='chat-panel__header_left'>
        <Image
          src={`https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png`}
          style={{ height: '50px', width: '50px' }}
          alt={`John Doe`}
          imageClass={'circle'}
        />

        <div className='user-info'>
          <span className='user-info__username'>
            {chattingWith.firstname} {chattingWith.lastname}
          </span>
          <span className='user-info__last-seend'>
            last seen today at 8:59 a.m.
          </span>
        </div>
      </div>
      <div className='chat-panel__header_right'>
        <Icon color='#fff' icon='more_vert' />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
  };
};
export default connect(mapStateToProps, null)(ChatHeader);
