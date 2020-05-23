import React from 'react';
import ListItem from '../list-item/ListItem';

const UserListings = () => {
  const USERS_ONLINE = [
    {
      id: '1',
      name: 'Nwachukwu Uchenna',
      lastMessage: 'Hey how are you doing',
      messageTime: '5.00 a.m.',
    },
    {
      id: '2',
      name: 'Jane Doe',
      lastMessage: 'Hi how are you doing',
      messageTime: '3.30 a.m.',
    },
    {
      id: '3',
      name: 'Louis Kenneth',
      lastMessage: 'Hey how are you doing',
      messageTime: '5.00 p.m.',
    },
    {
      id: '4',
      name: 'Amaka Ada',
      lastMessage: 'Hey how are you doing',
      messageTime: '2.40 p.m.',
    },
    {
      id: '5ewfw',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'wrwrw5',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'wrwrw5',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'wrwr5wra',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'w5awr',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'wag5wra',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'wawg5w',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
    {
      id: 'csfsf5',
      name: 'Joy Michael',
      lastMessage: 'Hey how are you doing',
      messageTime: '7.50 a.m.',
    },
  ];

  return (
    <React.Fragment>
      <ul class='collection'>
        {USERS_ONLINE.map(user => {
          return <ListItem key={user.id} user={user} />;
        })}
      </ul>
    </React.Fragment>
  );
};

export default UserListings;
