import { user_actions } from '../types';
import apiConfig from '../../api-config/config';

export const registerAction = user => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users', user);

      if (response.status === 201) {
        loginTokenAction(response.data.token);
        dispatch({
          type: user_actions.SIGNUP_ACTION,
          payload: response.data,
        });
      }
    } catch (e) {}
  };
};
export const loginAction = user => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users/login', user);

      if (response.status === 200) {
        localStorage.setItem('user', response.data.token);
        dispatch({
          type: user_actions.SIGNIN_ACTION,
          payload: response.data,
        });
      }
    } catch (e) {}
  };
};
export const loginTokenAction = token => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(`/api/users/login/${token}`);

      const user =
        Object.keys(response.data).length !== 0 ? response.data : null;

      if (response.status === 200 && user) {
        localStorage.setItem('user', token);
        dispatch({
          type: user_actions.SIGNIN_ACTION,
          payload: user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const fetchPeopleAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(`/api/users/people/all`);

      const people =
        Object.keys(response.data).length !== 0 ? response.data : null;

      if (response.status === 200 && people) {
        dispatch({
          type: user_actions.FETCHED_PEOPLE,
          payload: people,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const logoutAction = token => {
  return async dispatch => {
    try {
      localStorage.removeItem('user');
      dispatch({
        type: user_actions.SIGNOUT_ACTION,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendRequestAction = data => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/notifications', data);

      if (response.status === 201) {
        dispatch({
          type: user_actions.SEND_CONNECTION_REQUEST,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const getFriendRequestAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get(
        '/api/notifications/my-notifications/'
      );

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_FRIEND_REQUESTS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const getMyFriendsAction = () => {
  return async dispatch => {
    try {
      let response = await apiConfig.get('/api/users/my/friends');

      if (response.status === 200) {
        dispatch({
          type: user_actions.FETCHED_FRIENDS,
          payload: response.data.friends,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const acceptFriendRequestAction = friendRequestID => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users/accept-friend-request', {
        friendRequestID: friendRequestID,
      });

      if (response.status === 200) {
        getMyFriendsAction();
      }
    } catch (e) {
      console.log(e);
    }
  };
};
