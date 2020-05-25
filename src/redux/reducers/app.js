import { user_actions } from '../types';

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case user_actions.SIGNIN_ACTION:
      return { ...state, currentUser: action.payload };
    case user_actions.SIGNOUT_ACTION:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
