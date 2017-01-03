import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';
import { browserHistory } from 'react-router';

function* loadEventList({ city, state }) {
  const url = `/event/${city ? '?city=' + city : ''}${state ? '&state=' + state : ''}`;
  try {
    const { data } = yield call(axios, url);
    yield put(actions.getEventListSuccess(data));
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
    const { data } = yield call(axios, `/event/${id}`);
    yield put(actions.getEventByIdSuccess(data));
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
    const { data } = yield call(axios, `/event/org/${id}`);
    yield put(actions.getEventsByOrganizationIdSuccess(data));
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

function* loadUserNextEvent() {
  try {
    const { data } = yield call(axios, `/event/next`);
    yield put(actions.getNextEventSuccess(data));
  } catch (error) {
    yield put(actions.getNextEventFailure(error));
  }
}
export function* watchGetNextEvent() {
  while (true) {
    yield take(a.GET_NEXT_EVENT);
    yield fork(loadUserNextEvent);
  }
}

function* createNewEvent({ event }) {
  try {
    const { data } = yield call(axios.post, `/event/`, event);
    browserHistory.push(`/events/${data.eventId}`);
    yield put(actions.postEventSuccess(data));
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
    const { data } = yield call(axios.patch, `/event/${id}`, event);
    yield put(actions.patchEventByIdSuccess(data));
  } catch (error) {
    yield put(actions.patchEventByIdFailure(error));
  }
}
export function* watchPatchEvent() {
  while (true) {
    const { payload } = yield take(a.PATCH_EVENT_BY_ID);
    yield fork(modifyEvent, payload);
  }
}

function* deleteEvent({ id }) {
  try {
    yield call(axios.delete, `/event/${id}`);
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