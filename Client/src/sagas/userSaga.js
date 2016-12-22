import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadUserData() {
  try {
    const { data } = yield call(axios, `/account/`);
    console.log('LOADING USER DATA...', data);
    yield put(actions.getUserSuccess(data));
  } catch (error) {
    yield put(actions.getUserFailure(error));
  }
}
export function* watchGetUser() {
  while (true) {
    const { payload } = yield take(a.GET_USER);
    yield fork(loadUserData, payload);
  }
}