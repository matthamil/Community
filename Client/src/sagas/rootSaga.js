import { fork } from 'redux-saga/effects';
// import other sagas
import {
  watchGetOrganizationList,
  watchGetOrganizationById,
  watchGetOrganizationsByOrganizerId,
  watchPostOrganization,
  watchPatchOrganization,
  watchDeleteOrganization
} from './organizationSaga';
import {
  watchGetEventList,
  watchGetEventById,
  watchGetEventsByOrganizationId,
  watchPostEvent,
  watchPatchEvent,
  watchDeleteEvent
} from './eventSaga';
import {
  watchGetEventMembers,
  watchGetEventMemberById,
  watchPostEventMember,
  watchPatchEventMember,
  watchClaimEventMember,
  watchUnclaimEventMember,
  watchDeleteEventMember
} from './eventMemberSaga';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

const rootSaga = startSagas(
  // list all sagas
  watchGetOrganizationList,
  watchGetOrganizationById,
  watchGetOrganizationsByOrganizerId,
  watchPostOrganization,
  watchPatchOrganization,
  watchDeleteOrganization,
  watchGetEventList,
  watchGetEventById,
  watchGetEventsByOrganizationId,
  watchPostEvent,
  watchPatchEvent,
  watchDeleteEvent,
  watchGetEventMembers,
  watchGetEventMemberById,
  watchPostEventMember,
  watchPatchEventMember,
  watchClaimEventMember,
  watchUnclaimEventMember,
  watchDeleteEventMember
);

export default rootSaga;
