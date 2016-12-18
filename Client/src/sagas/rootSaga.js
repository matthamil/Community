import { fork } from 'redux-saga/effects';
// import other sagas

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

const rootSaga = startSagas(
  // list all sagas
);

export default rootSaga;
