import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';
import * as a from '../actions/actionTypes';

function* loadOrganizationList({ city, state }) {
  const url = `/organization/${city ? '?city=' + city : ''}${state ? '&state=' + state : ''}`;
  try {
    const { data } = yield call(axios, url);
    yield put(actions.getOrganizationListSuccess(data));
  } catch (error) {
    yield put(actions.getOrganizationListFailure(error));
  }
}
export function* watchGetOrganizationList() {
  while (true) {
    const { payload } = yield take(a.GET_ORGANIZATION_LIST);
    yield fork(loadOrganizationList, payload);
  }
}

function* loadOrganizationById({ id }) {
  try {
    const organization = yield call(axios, `/organization/${id}`);
    yield put(actions.getOrganizationByIdSuccess(organization));
  } catch (error) {
    yield put(actions.getOrganizationByIdFailure(error));
  }
}
export function* watchGetOrganizationById() {
  while (true) {
    const { payload } = yield take(a.GET_ORGANIZATION_BY_ID);
    yield fork(loadOrganizationById, payload);
  }
}

function* loadOrganizationsByOrganizerId({ id }) {
  try {
    const organizations = yield call(axios, `/organization/organizerId?=${id}`);
    yield put(actions.getOrganizationsByOrganizerIdSuccess(organizations));
  } catch (error) {
    yield put(actions.getOrganizationsByOrganizerIdFailure(error));
  }
}
export function* watchGetOrganizationsByOrganizerId() {
  while (true) {
    const { payload } = yield take(a.GET_ORGANIZATIONS_BY_ORGANIZER_ID);
    yield fork(loadOrganizationsByOrganizerId, payload);
  }
}

function* createNewOrganization({ organization }) {
  try {
    const success = yield call(axios.post, `/organization/`, organization);
    yield put(actions.postOrganizationSuccess(success));
  } catch (error) {
    yield put(actions.postOrganizationFailure(error));
  }
}
export function* watchPostOrganization() {
  while (true) {
    const { payload } = yield take(a.POST_ORGANIZATION);
    yield fork(createNewOrganization, payload);
  }
}

function* modifyOrganization({ id, organization }) {
  try {
    const success = yield call(axios.patch, `/organization/${id}`, organization);
    yield put(actions.patchOrganizationSuccess(success));
  } catch (error) {
    yield put(actions.patchOrganizationFailure(error));
  }
}
export function* watchPatchOrganization() {
  while (true) {
    const { payload } = yield take(a.PATCH_ORGANIZATION);
    yield fork(modifyOrganization, payload);
  }
}

function* deleteOrganization({ id }) {
  try {
    yield call(axios.delete, `/organization/${id}`);
    yield put(actions.deleteOrganizationSuccess());
  } catch (error) {
    yield put(actions.deleteOrganizationFailure(error));
  }
}
export function* watchDeleteOrganization() {
  while (true) {
    const { payload } = yield take(a.DELETE_ORGANIZATION);
    yield fork(deleteOrganization, payload);
  }
}