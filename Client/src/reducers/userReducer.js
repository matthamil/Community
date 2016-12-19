import * as a from '../actions/actionTypes';
import { user } from './initialState';

export default function userReducer(state = user, action) {
  switch (action.type) {
    default:
      return state;
  }
}
