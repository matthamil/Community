import initialState from './initialState';
const { event } = initialState;
import * as a from '../actions/actionTypes';

export default function eventReducer(state = event, action) {
  switch (action.type) {
    case a.GET_EVENT_LIST:
      return {
        ...state,
        loading: true,
        city: action.payload.city,
        state: action.payload.state
      };
    case a.GET_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.events
      };
    case a.GET_EVENT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.GET_EVENT_BY_ID:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload.event
      };
    case a.GET_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        organization: action.payload.organization
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.POST_EVENT:
      return {
        ...state,
        loading: true,
        event: action.payload.event
      };
    case a.POST_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload.event
      };
    case a.POST_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.PATCH_EVENT:
      return {
        ...state,
        loading: true,
        event: action.payload.event
      };
    case a.PATCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload.event
      };
    case a.PATCH_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.DELETE_EVENT:
      return {
        ...state,
        loading: false,
        id: action.payload.id
      };
    case a.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
