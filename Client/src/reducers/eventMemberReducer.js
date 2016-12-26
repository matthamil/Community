import * as a from '../actions/actionTypes';
import initialState from './initialState';
const { eventMember } = initialState;

export default function eventMemberReducer(state = eventMember, action) {
  switch (action.type) {
    case a.GET_EVENT_MEMBERS:
      return {
        ...state,
        loading: true,
      };
    case a.GET_EVENT_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userEventMembers: action.payload.userEventMembers
      };
    case a.GET_EVENT_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.GET_EVENT_MEMBERS_BY_ID:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_EVENT_MEMBERS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        eventMembers: action.payload.eventMembers
      };
    case a.GET_EVENT_MEMBERS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.POST_EVENT_MEMBER:
      return {
        ...state,
        loading: true,
        eventMember: action.payload.eventMember
      };
    case a.POST_EVENT_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        eventMember: action.payload.eventMember
      };
    case a.POST_EVENT_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.PATCH_EVENT_MEMBER:
      return {
        ...state,
        loading: true,
        eventMember: action.payload.eventMember
      };
    case a.PATCH_EVENT_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        eventMember: action.payload.eventMember
      };
    case a.PATCH_EVENT_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.CLAIM_EVENT_MEMBER:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.CLAIM_EVENT_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        eventMember: action.payload.eventMember
      };
    case a.CLAIM_EVENT_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.UNCLAIM_EVENT_MEMBER:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.UNCLAIM_EVENT_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        eventMember: action.payload.eventMember
      };
    case a.UNCLAIM_EVENT_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.DELETE_EVENT_MEMBER:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.DELETE_EVENT_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.DELETE_EVENT_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
