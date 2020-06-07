import { chat_actions } from '../types';
import apiConfig from '../../api-config/config';

export const initialConnectionEstablishedAction = socketId => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users/update-my-socketid', {
        socketID: socketId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const userItemClicked = user => {
  return async dispatch => {
    try {
      dispatch({ type: chat_actions.USER_ITEM_SELECTED, payload: user });
    } catch (e) {
      console.log(e);
    }
  };
};
export const fetchMessagesAction = (sender, receiver) => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/messages/get-user-messages', {
        senderID: sender,
        receiverID: receiver,
      });

      if (response.status === 200) {
        if (response.data.length <= 0) {
          dispatch({
            type: chat_actions.FETCHED_MESSAGES_STARTED,
          });
        } else {
          dispatch({
            type: chat_actions.FETCHED_MESSAGES,
            payload: response.data,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateUnreadMessagesAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.UPDATE_UNREAD_MESSAGES,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchLastMessagesAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(`/api/messages/lastmessages`);

      if (response.status === 200) {
        dispatch({
          type: chat_actions.GET_LAST_MESSAGES,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const readUnreadMessagesAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.READ_USER_UNREAD_MESSAGES,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateUsersOnlineAction = userId => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.CURRENT_USERS_ONLINE,
        payload: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const removeUsersOnlineAction = userId => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.REMOVE_CURRENT_USER_ONLINE,
        payload: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const sendChatMessageAction = data => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/messages/send', data);
      console.log(response);
      if (200 === response.status) {
        dispatch({
          type: chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const receivedNewMessageAction = data => {
  return async dispatch => {
    try {
      dispatch({
        type: chat_actions.SEND_PERSONAL_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
