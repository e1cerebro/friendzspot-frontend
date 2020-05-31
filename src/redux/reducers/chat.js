import { chat_actions } from '../types';

const INITIAL_STATE = {
  chattingWith: null,
  messages: null,
  unreadMessages: [],
  usersOnline: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chat_actions.USER_ITEM_SELECTED:
      return { ...state, chattingWith: action.payload };
    case chat_actions.FETCHED_MESSAGES:
      return { ...state, messages: action.payload };
    case chat_actions.FETCHED_MESSAGES_STARTED:
      return { ...state, messages: null };
    case chat_actions.READ_USER_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter(message => {
          return (
            message.sender !== action.payload.sender &&
            message.receiver !== action.payload.receiver
          );
        }),
      };
    case chat_actions.UPDATE_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: [...state.unreadMessages, action.payload],
      };
    case chat_actions.CURRENT_USERS_ONLINE:
      const userExists = state.usersOnline.includes(action.payload);
      if (!userExists) {
        return {
          ...state,
          usersOnline: [...state.usersOnline, action.payload],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
