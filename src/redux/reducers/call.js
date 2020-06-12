import { audio_call_actions } from '../types';

const INITIAL_STATE = {
  audio_call_initiated: false,
  callee_info: null,
  stream: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case audio_call_actions.USER_CALL_INITIATED:
      return {
        ...state,
        audio_call_initiated: true,
        callee_info: action.payload,
      };
    case audio_call_actions.CALL_STREAM_UPDATED:
      return {
        ...state,
        stream: action.payload,
      };
    default:
      return state;
  }
};
