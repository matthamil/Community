import * as a from '../actions/actionTypes';
import initialState from './initialState';
const { user } = initialState;

export default function userReducer(state = user, action) {
  switch (action.type) {
    case a.GET_USER:
      return {
        ...state,
        loading: true
      };
    case a.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload
      };
    case a.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
