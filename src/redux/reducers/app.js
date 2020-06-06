import { user_actions, api_loader_action } from '../types';

const INITIAL_STATE = {
  people: null,
  last_connection_request: null,
  friend_requests: null,
  friends: null,
  previousFriendsList: null,
  lastRemovedFriend: null,
  last_messages: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_actions.FETCHED_PEOPLE:
      return { ...state, people: action.payload };
    case user_actions.SEND_CONNECTION_REQUEST:
      return { ...state, last_connection_request: action.payload };
    case user_actions.FETCHED_FRIEND_REQUESTS:
      return { ...state, friend_requests: action.payload };
    case user_actions.FETCHED_FRIENDS:
      return { ...state, friends: action.payload };
    case user_actions.GET_LAST_MESSAGES:
      return { ...state, last_messages: action.payload };
    case user_actions.UNFRIEND_USER:
      return {
        ...state,
        lastRemovedFriend: action.payload,
        previousFriendsList: state.friends,
        friends: state.friends.filter(friend => {
          return friend.id != action.payload.id;
        }),
      };
    case user_actions.UNDO_UNFRIENDES_USER:
      return {
        ...state,
        friends: state.previousFriendsList,
        previousFriendsList: null,
        lastRemovedFriend: null,
      };
    case user_actions.CONFIRM_UNFRIENDING_ACTION:
      return {
        ...state,
        friends: state.previousFriendsList.filter(friend => {
          return friend.id !== state.lastRemovedFriend.id;
        }),
        previousFriendsList: null,
        lastRemovedFriend: null,
      };
    case user_actions.UPDATE_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    case api_loader_action.USER_PROFILE_PHOTO_UPDATE_ENDED:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
