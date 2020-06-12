import apiConfig from '../../api-config/config';
import { audio_call_actions } from '../types';

export const audioCallInitiated = callInfo => {
  return async dispatch => {
    try {
      const response = await apiConfig.post('/api/calls/audio-call-initiated', {
        callInfo: callInfo,
      });

      if (200 === response.status) {
        dispatch({
          type: audio_call_actions.USER_CALL_INITIATED,
          payload: callInfo,
        });
      }
    } catch (e) {}
  };
};
export const audioCallAccepted = acceptInfo => {
  return async dispatch => {
    try {
      const response = await apiConfig.post('/api/calls/audio-call-accepted', {
        acceptInfo: acceptInfo,
      });

      if (200 === response.status) {
        dispatch({
          type: audio_call_actions.USER_CALL_INITIATED,
        });
      }
    } catch (e) {}
  };
};
export const updateCallStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.CALL_STREAM_UPDATED,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
