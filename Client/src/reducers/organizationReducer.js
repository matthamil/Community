import * as a from '../actions/actionTypes';
import initialState from './initialState';
const { org } = initialState;

export default function organizationReducer(state = org, action) {
  switch (action.type) {
    case a.GET_ORGANIZATION_LIST:
      return {
        ...state,
        loading: true,
        city: action.payload.city,
        state: action.payload.state
      };
    case a.GET_ORGANIZATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        organizations: action.payload.organizations
      };
    case a.GET_ORGANIZATION_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.GET_ORGANIZATION_BY_ID:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_ORGANIZATION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orgById: action.payload.organizations
      };
    case a.GET_ORGANIZATION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.GET_ORGANIZATIONS_BY_ORGANIZER_ID:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.GET_ORGANIZATIONS_BY_ORGANIZER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrganizations: action.payload.organizations
      };
    case a.GET_ORGANIZATIONS_BY_ORGANIZER_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.POST_ORGANIZATION:
      return {
        ...state,
        loading: true,
        organization: action.payload.organization
      };
    case a.POST_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrganizations: [
          ...state.userOrganizations,
          action.payload.organization
        ]
      };
    case a.POST_ORGANIZATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.PATCH_ORGANIZATION_BY_ID:
      return {
        ...state,
        loading: true,
        organization: action.payload.organization
      };
    case a.PATCH_ORGANIZATION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orgById: action.payload.organization
      };
    case a.PATCH_ORGANIZATION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case a.DELETE_ORGANIZATION:
      return {
        ...state,
        loading: true,
        id: action.payload.id
      };
    case a.DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrganizations: [
          ...state.userOrganizations.slice(0, state.userOrganizations.indexOf(state.userOrganizations.find(x => x.organizationId === action.payload.id))),
          ...state.userOrganizations.slice(state.userOrganizations.indexOf(state.userOrganizations.find(x => x.organizationId === action.payload.id)) + 1)
        ]
      }
    default:
      return state;
  }
}
