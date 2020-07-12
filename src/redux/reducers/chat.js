import { chat_actions, user_actions } from '../types';

const INITIAL_STATE = {
  chattingWith: null,
  sentMessages: [],
  unreadMessages: [],
  usersOnline: [],
  last_messages: [],
  clearingChatHistory: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chat_actions.USER_ITEM_SELECTED:
      return { ...state, chattingWith: action.payload };
    case chat_actions.FETCHED_MESSAGES:
      return { ...state, sentMessages: action.payload };
    case chat_actions.FETCHED_MESSAGES_STARTED:
      return { ...state, messages: null };
    case chat_actions.GET_LAST_MESSAGES:
      return { ...state, last_messages: action.payload };
    case chat_actions.READ_USER_UNREAD_MESSAGES:
      const updatedMessages = state.unreadMessages.filter(message => {
        return message.sender.id !== action.payload.id;
      });
      return {
        ...state,
        unreadMessages: updatedMessages,
      };
    case chat_actions.UPDATE_UNREAD_MESSAGES:
      state.unreadMessages.push(action.payload);
      return {
        ...state,
        // unreadMessages: [...state.unreadMessages, action.payload],
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
    case chat_actions.REMOVE_CURRENT_USER_ONLINE:
      const userExistOnline = state.usersOnline.includes(action.payload);
      if (userExistOnline) {
        return {
          ...state,
          usersOnline: state.usersOnline.filter(id => id !== action.payload),
        };
      } else {
        return state;
      }
    case chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS:
      const newUserMessaged = [action.payload];
      return {
        ...state,
        sentMessages: state.sentMessages !== null && [
          ...state.sentMessages,
          action.payload,
        ],
        last_messages: [...newUserMessaged, ...state.last_messages],
      };
    case chat_actions.END_CLEAR_CHAT_HISTORY:
      const filteredLastMessages = state.last_messages.filter(
        message =>
          message.receiver.id !== action.payload &&
          message.sender.id !== action.payload
      );

      return {
        ...state,
        sentMessages: [],
        last_messages: filteredLastMessages,
        clearingChatHistory: false,
      };

    case chat_actions.START_CLEAR_CHAT_HISTORY:
      return {
        ...state,
        clearingChatHistory: true,
      };

    default:
      return state;
  }
};
