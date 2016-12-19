import * as a from '../actions/actionTypes';
import { eventChatroom } from './initialState';

export default function eventChatroomMessageReducer(state = eventChatroom, action) {
  switch (action.type) {
    case a.GET_EVENT_CHATROOM_MESSAGES:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_EVENT_CHATROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages
      };
    case a.GET_EVENT_CHATROOM_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.POST_EVENT_CHATROOM_MESSAGE:
      return {
        ...state,
        loading: true,
        message: action.payload.message
      };
    case a.POST_EVENT_CHATROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    case a.POST_EVENT_CHATROOM_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.PATCH_EVENT_CHATROOM_MESSAGE:
      return {
        ...state,
        loading: true,
        message: action.payload.message
      };
    case a.PATCH_EVENT_CHATROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    case a.PATCH_EVENT_CHATROOM_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.DELETE_EVENT_CHATROOM_MESSAGE:
      return {
        ...state,
        loading: false,
        id: action.payload.id
      };
    case a.DELETE_EVENT_CHATROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.DELETE_EVENT_CHATROOM_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
