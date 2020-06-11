import { auth_actions } from '../types';
import apiConfig from '../../api-config/config';

export const registerAction = user => {
  return async dispatch => {
    try {
      let response = await apiConfig.post('/api/users', user);

      if (response.status === 201) {
        loginTokenAction(response.data.token);
        dispatch({
          type: auth_actions.SIGNUP_ACTION,
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
          type: auth_actions.SIGNIN_ACTION,
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
          type: auth_actions.SIGNIN_ACTION,
          payload: user,
        });
      } else {
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const logoutAction = id => {
  return async dispatch => {
    try {
      let response = await apiConfig.post(`/api/users/logout/${id}`);
      localStorage.removeItem('user');
      if (response.status === 200) {
        console.log(response.data);
      }

      dispatch({
        type: auth_actions.SIGNOUT_ACTION,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
