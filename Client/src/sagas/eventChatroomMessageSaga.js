import { takeEvery } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadEventChatroomMessages({ id }) {
  try {
    const messages = yield call(axios, `http://localhost:5000/eventchatroommessage/${id}`);
    yield put(actions.getEventChatroomMessagesSuccess(messages));
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

function* createNewChatroomMessage({ message }) {
  try {
    const success = yield call(axios.post, `http://localhost:5000/eventchatroommessage/`, message);
    yield put(actions.postEventChatroomMessageSuccess(success));
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

function* modifyEventChatroomMessage({ id, message }) {
  try {
    const success = yield call(axios.patch, `http://localhost:5000/eventchatroommessage/${id}`, message);
    yield put(actions.patchEventChatroomMessageSuccess(success));
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

function* deleteEventChatroomMessage({ id }) {
  try {
    yield call(axios.delete, `http://localhost:5000/eventchatroommessage/${id}`);
    yield put(actions.deleteEventChatroomMessageSuccess());
  } catch (error) {
    yield put(actions.deleteEventChatroomMessageFailure(error));
  }
}
export function* watchDeleteEventChatroomMessage() {
  while (true) {
    const { payload } = yield take(a.DELETE_EVENT_CHATROOM_MESSAGE);
    yield fork(deleteEventMember, payload);
  }
}