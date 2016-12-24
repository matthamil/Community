import initialState from './initialState';
const { event } = initialState;
import * as a from '../actions/actionTypes';

export default function eventReducer(state = event, action) {
  switch (action.type) {
    case a.GET_EVENT_LIST:
      return {
        ...state,
        loadingEventList: true
      };
    case a.GET_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loadingEventList: false,
        events: action.payload.events
      };
    case a.GET_EVENT_LIST_FAILURE:
      return {
        ...state,
        loadingEventList: false,
        error: action.payload.error
      };
    case a.GET_EVENT_BY_ID:
      return {
        ...state,
        loadingEventById: true,
        id: action.payload.id
      };
    case a.GET_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        loadingEventById: false,
        eventById: action.payload.event
      };
    case a.GET_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        loadingEventById: false,
        error: action.payload.error
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID:
      return {
        ...state,
        loadingEventsByOrgId: true,
        id: action.payload.id
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        loadingEventsByOrgId: false,
        organization: action.payload.organization
      };
    case a.GET_EVENTS_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        loadingEventsByOrgId: false,
        error: action.payload.error
      };
    case a.GET_NEXT_EVENT:
      return {
        ...state,
        loadingNextEvent: true
      };
    case a.GET_NEXT_EVENT_SUCCESS:
      return {
        ...state,
        loadingNextEvent: false,
        nextEvent: action.payload
      };
    case a.GET_NEXT_EVENT_FAILURE:
      return {
        ...state,
        loadingNextEvent: false,
        error: action.payload
      };
    case a.POST_EVENT:
      return {
        ...state,
        loadingPostEvent: true,
        event: action.payload.event
      };
    case a.POST_EVENT_SUCCESS:
      return {
        ...state,
        loadingPostEvent: false,
        event: action.payload.event
      };
    case a.POST_EVENT_FAILURE:
      return {
        ...state,
        loadingPostEvent: false,
        error: action.payload.error
      };
    case a.PATCH_EVENT:
      return {
        ...state,
        loadingPatchEvent: true,
        event: action.payload.event
      };
    case a.PATCH_EVENT_SUCCESS:
      return {
        ...state,
        loadingPatchEvent: false,
        event: action.payload.event
      };
    case a.PATCH_EVENT_FAILURE:
      return {
        ...state,
        loadingPatchEvent: false,
        error: action.payload.error
      };
    case a.DELETE_EVENT:
      return {
        ...state,
        loadingDeleteEvent: false,
        id: action.payload.id
      };
    case a.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loadingDeleteEvent: false
      };
    case a.DELETE_EVENT_FAILURE:
      return {
        ...state,
        loadingDeleteEvent: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
