import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadEventChatroomMessages({ id }) {
  try {
    const { data } = yield call(axios, `/eventchatroommessage/${id}`);
    yield put(actions.getEventChatroomMessagesSuccess(data));
  } catch (error) {
    yield put(actions.getEventChatroomMessagesFailure(error));
  }
}
export function* watchGetEventChatroomMessages() {
  while (true) {
    const { payload } = yield take(a.GET_EVENT_CHATROOM_MESSAGES);
    yield fork(loadEventChatroomMessages, payload);
  }
}

function* createNewChatroomMessage({ eventId, message }) {
  try {
    const { data } = yield call(axios.post, `/eventchatroommessage/${eventId}`, message);
    yield put(actions.postEventChatroomMessageSuccess(data));
  } catch (error) {
    yield put(actions.postEventChatroomMessageFailure(error));
  }
}
export function* watchPostEventChatroomMessage() {
  while (true) {
    const { payload } = yield take(a.POST_EVENT_CHATROOM_MESSAGE);
    yield fork(createNewChatroomMessage, payload);
  }
}

function* modifyEventChatroomMessage({ eventId, messageId, message }) {
  try {
    const { data } = yield call(axios.patch, `/eventchatroommessage/${eventId}/${messageId}`, message);
    yield put(actions.patchEventChatroomMessageSuccess(data));
  } catch (error) {
    yield put(actions.patchEventChatroomMessageFailure(error));
  }
}
export function* watchPatchEventChatroomMessage() {
  while (true) {
    const { payload } = yield take(a.PATCH_EVENT_CHATROOM_MESSAGE);
    yield fork(modifyEventChatroomMessage, payload);
  }
}

function* deleteEventChatroomMessage({ eventId, messageId }) {
  try {
    const { data } = yield call(axios.delete, `/eventchatroommessage/${eventId}/${messageId}`);
    yield put(actions.deleteEventChatroomMessageSuccess(data));
  } catch (error) {
    yield put(actions.deleteEventChatroomMessageFailure(error));
  }
}
export function* watchDeleteEventChatroomMessage() {
  while (true) {
    const { payload } = yield take(a.DELETE_EVENT_CHATROOM_MESSAGE);
    yield fork(deleteEventChatroomMessage, payload);
  }
}