import { user_actions } from '../types';

const INITIAL_STATE = {
  currentUser: null,
  people: null,
  last_connection_request: null,
  friend_requests: null,
  friends: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_actions.SIGNIN_ACTION:
      return { ...state, currentUser: action.payload };
    case user_actions.SIGNOUT_ACTION:
      return { ...state, currentUser: null };
    case user_actions.FETCHED_PEOPLE:
      return { ...state, people: action.payload };
    case user_actions.SEND_CONNECTION_REQUEST:
      return { ...state, last_connection_request: action.payload };
    case user_actions.FETCHED_FRIEND_REQUESTS:
      return { ...state, friend_requests: action.payload };
    case user_actions.FETCHED_FRIENDS:
      return { ...state, friends: action.payload };
    default:
      return state;
  }
};
