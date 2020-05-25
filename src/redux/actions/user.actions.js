import { user_actions } from '../types';
import { CHAT_API_URL } from '../../utils/api-settings';
import apiConfig from '../../api-config/config';

export const registerAction = user => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users', user);

      if (response.status === 201) {
        console.log(response.data.token);
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

      console.log('LOGIN: ', response);
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

      if (response.status === 200) {
        localStorage.setItem('user', token);
        dispatch({
          type: user_actions.SIGNIN_ACTION,
          payload: response.data,
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
      dispatch({
        type: user_actions.SIGNOUT_ACTION,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
