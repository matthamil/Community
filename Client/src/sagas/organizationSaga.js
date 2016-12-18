import { takeEvery } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/actionCreators';

// export function* loadGifsFromSearchText(searchText) {
//   try {
//     const { data: { data } } = yield call(axios, `https://api.giphy.com/v1/gifs/search?q=${searchText.trim().replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`);
//     yield put(actionCreators.getGifsFromSearchTextSuccess(data));
//   } catch (error) {
//     yield put(actionCreators.giphyFetchFailed());
//   }
// }

export function* loadOrganizationList(city, state) {
  try {
    const organizations = yield call(axios, `http://localhost:5000/organizations`);
    yield put(actions.getOrganizationListSuccess(organizations));
  }
}

// export function* watchGetGifsFromSearchText() {
//   while (true) {
//     const { payload } = yield take('GET_GIFS_FROM_SEARCH_TEXT');
//     yield fork(loadGifsFromSearchText, payload);
//   }
// }
//
// export function* loadTrendingGifs() {
//   console.log("load trending");
//   try {
//     const { data: { data } } = yield call(axios, 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC');
//     yield put(actionCreators.getTrendingGifsSuccess(data));
//   } catch (error) {
//     yield put(actionCreators.giphyFetchFailed());
//   }
// }
//
// export function* watchGetTrendingGifs() {
//   yield takeEvery('GET_TRENDING_GIFS', loadTrendingGifs);
// }
