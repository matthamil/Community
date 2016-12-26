import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadUserData() {
  let id;
  try {
    const { data } = yield call(axios, `/account/`);
    console.log('LOADING USER DATA...', data);
    id = data.id;
    yield put(actions.getUserSuccess(data));
  } catch (error) {
    yield put(actions.getUserFailure(error));
  }
  try {
    const { data } = yield call(axios, `/organization/organizerId/${id}`);
    console.log('USER ORGANIZATIONS: ', data);
    yield put(actions.getOrganizationsByOrganizerIdSuccess(data));
  } catch (error) {
    yield put(actions.getOrganizationsByOrganizerIdFailure(error));
  }
}

export function* watchGetUser() {
  while (true) {
    const { payload } = yield take(a.GET_USER);
    yield fork(loadUserData, payload);
  }
}