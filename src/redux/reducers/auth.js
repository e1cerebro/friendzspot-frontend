import { auth_actions, user_actions } from '../types';

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case auth_actions.SIGNIN_ACTION:
      return { ...state, currentUser: action.payload };
    case auth_actions.SIGNOUT_ACTION:
      return { ...state, currentUser: null };
    case user_actions.USER_COVER_PHOTO_UPDATED:
      return { ...state, currentUser: action.payload };
    case user_actions.USER_PROFILE_PHOTO_UPDATE_ENDED:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
