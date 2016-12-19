import { takeEvery } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadEventList({ city, state }) {
  try {
    const events = yield call(axios, `http://localhost:5000/event/`);
    yield put(actions.getEventListSuccess(events));
  } catch (error) {
    yield put(actions.getEventListFailure(error));
  }
}
export function* watchGetEventList() {
  while (true) {
    const { payload } = yield take(a.GET_EVENT_LIST);
    yield fork(loadEventList, payload);
  }
}

function* loadEventById({ id }) {
  try {
    const event = yield call(axios, `http://localhost:5000/event/${id}`);
    yield put(actions.getEventByIdSuccess(event));
  } catch (error) {
    yield put(actions.getEventByIdFailure(error));
  }
}
export function* watchGetEventById() {
  while (true) {
    const { payload } = yield take(a.GET_EVENT_BY_ID);
    yield fork(loadEventById, payload);
  }
}

function* loadEventsByOrganizationId({ id }) {
  try {
    const events = yield call(axios, `http://localhost:5000/event/org/${id}`);
    yield put(actions.getEventsByOrganizationIdSuccess(events));
  } catch (error) {
    yield put(actions.getEventsByOrganizationIdFailure(error));
  }
}
export function* watchGetEventsByOrganizationId() {
  while (true) {
    const { payload } = yield take(a.GET_EVENTS_BY_ORGANIZATION_ID);
    yield fork(loadEventsByOrganizationId, payload);
  }
}

function* createNewEvent({ event }) {
  try {
    const success = yield call(axios.post, `http://localhost:5000/event/`, event);
    yield put(actions.postEventSuccess(success));
  } catch (error) {
    yield put(actions.postEventFailure(error));
  }
}
export function* watchPostEvent() {
  while (true) {
    const { payload } = yield take(a.POST_EVENT);
    yield fork(createNewEvent, payload);
  }
}

function* modifyEvent({ id, event }) {
  try {
    const success = yield call(axios.patch, `http://localhost:5000/event/${id}`, event);
    yield put(actions.patchEventSuccess(success));
  } catch (error) {
    yield put(actions.patchEventFailure(error));
  }
}
export function* watchPatchEvent() {
  while (true) {
    const { payload } = yield take(a.PATCH_EVENT);
    yield fork(modifyEvent, payload);
  }
}

function* deleteEvent({ id }) {
  try {
    yield call(axios.delete, `http://localhost:5000/event/${id}`);
    yield put(actions.deleteEventSuccess());
  } catch (error) {
    yield put(actions.deleteEventFailure(error));
  }
}
export function* watchDeleteEvent() {
  while (true) {
    const { payload } = yield take(a.DELETE_EVENT);
    yield fork(deleteEvent, payload);
  }
}