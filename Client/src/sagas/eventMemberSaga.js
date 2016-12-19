import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadEventMembers() {
  try {
    const eventMembers = yield call(axios, `http://localhost:5000/event/`);
    yield put(actions.getEventMembersSuccess(eventMembers));
  } catch (error) {
    yield put(actions.getEventMembersFailure(error));
  }
}
export function* watchGetEventMembers() {
  while (true) {
    yield take(a.GET_EVENT_MEMBERS);
    yield fork(loadEventMembers);
  }
}

function* loadEventMemberById({ id }) {
  try {
    const eventMember = yield call(axios, `http://localhost:5000/eventmember/${id}`);
    yield put(actions.getEventMemberByIdSuccess(eventMember));
  } catch (error) {
    yield put(actions.getEventMemberByIdFailure(error));
  }
}
export function* watchGetEventMemberById() {
  while (true) {
    const { payload } = yield take(a.GET_EVENT_MEMBER_BY_ID);
    yield fork(loadEventMemberById, payload);
  }
}

function* createNewEventMember({ eventMember }) {
  try {
    const success = yield call(axios.post, `http://localhost:5000/eventmember/`, eventMember);
    yield put(actions.postEventMemberSuccess(success));
  } catch (error) {
    yield put(actions.postEventMemberFailure(error));
  }
}
export function* watchPostEventMember() {
  while (true) {
    const { payload } = yield take(a.POST_EVENT_MEMBER);
    yield fork(createNewEventMember, payload);
  }
}

function* modifyEventMember({ id, eventMember }) {
  try {
    const success = yield call(axios.patch, `http://localhost:5000/eventmember/${id}`, eventMember);
    yield put(actions.patchEventMemberSuccess(success));
  } catch (error) {
    yield put(actions.patchEventMemberFailure(error));
  }
}
export function* watchPatchEventMember() {
  while (true) {
    const { payload } = yield take(a.PATCH_EVENT_MEMBER);
    yield fork(modifyEventMember, payload);
  }
}

function* claimEventMember({ id }) {
  try {
    const success = yield call(axios, `http://localhost:5000/eventmember/claim/${id}`);
    yield put(actions.claimEventMemberSuccess(success));
  } catch (error) {
    yield put(actions.claimEventMemberFailure(error));
  }
}
export function* watchClaimEventMember() {
  while (true) {
    const { payload } = yield take(a.CLAIM_EVENT_MEMBER);
    yield fork(claimEventMember, payload);
  }
}

function* unclaimEventMember({ id }) {
  try {
    const success = yield call(axios.delete, `http://localhost:5000/eventmember/claim/${id}`);
    yield put(actions.unclaimEventMemberSuccess(success));
  } catch (error) {
    yield put(actions.unclaimEventMemberFailure(error));
  }
}
export function* watchUnclaimEventMember() {
  while (true) {
    const { payload } = yield take(a.UNCLAIM_EVENT_MEMBER);
    yield fork(unclaimEventMember, payload);
  }
}

function* deleteEventMember({ id }) {
  try {
    yield call(axios.delete, `http://localhost:5000/eventmember/${id}`);
    yield put(actions.deleteEventMemberSuccess());
  } catch (error) {
    yield put(actions.deleteEventMemberFailure(error));
  }
}
export function* watchDeleteEventMember() {
  while (true) {
    const { payload } = yield take(a.DELETE_EVENT_MEMBER);
    yield fork(deleteEventMember, payload);
  }
}