import { audio_call_actions } from '../types';

const INITIAL_STATE = {
  audio_call_initiated: false,
  callee_info: null,
  stream: false,
  callerStream: null,
  receiverStream: null,
  outGoingCall: false,
  incomingCall: false,
  incomingCallAccepted: false,
  incomingStream: null,
  showModal: false,
  partnerConnected: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case audio_call_actions.USER_CALL_INITIATED:
      return {
        ...state,
        audio_call_initiated: true,
        callee_info: action.payload,
      };
    case audio_call_actions.AUDIO_STREAM:
      return {
        ...state,
        stream: action.payload,
      };
    case audio_call_actions.ADD_CALLER_STREAM:
      return {
        ...state,
        callerStream: action.payload,
      };
    case audio_call_actions.REMOVE_CALLER_STREAM:
      return {
        ...state,
        callerStream: null,
      };
    case audio_call_actions.ADD_RECEIVER_STREAM:
      return {
        ...state,
        receiverStream: action.payload,
      };
    case audio_call_actions.REMOVE_RECEIVER_STREAM:
      return {
        ...state,
        receiverStream: null,
      };
    case audio_call_actions.START_INCOMING_CALL:
      return {
        ...state,
        incomingCall: true,
        incomingStream: action.payload,
      };
    case audio_call_actions.INCOMING_CALL_ACCEPTED:
      return {
        ...state,
        incomingCallAccepted: true,
        incomingCall: false,
      };
    case audio_call_actions.END_INCOMING_CALL:
      return {
        ...state,
        incomingCall: false,
        incomingCallAccepted: false,
        showModal: false,
        audio_call_initiated: false,
        callee_info: null,
        callerStream: null,
        receiverStream: null,
        incomingStream: null,
      };
    case audio_call_actions.START_OUTGOING_CALL:
      return {
        ...state,
        outGoingCall: true,
      };
    case audio_call_actions.END_OUTGOING_CALL:
      return {
        ...state,
        outGoingCall: false,
        showModal: false,
        audio_call_initiated: false,
        callee_info: null,
        callerStream: null,
        receiverStream: null,
      };
    case audio_call_actions.SHOW_CALL_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case audio_call_actions.HIDE_CALL_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};
