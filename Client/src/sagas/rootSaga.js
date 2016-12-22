import { fork } from 'redux-saga/effects';
// import other sagas
import * as organization from './organizationSaga';
import * as event from './eventSaga';
import * as eventMember from './eventMemberSaga';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

const rootSaga = startSagas(
  // list all sagas
  organization.watchGetOrganizationList,
  organization.watchGetOrganizationById,
  organization.watchGetOrganizationsByOrganizerId,
  organization.watchPostOrganization,
  organization.watchPatchOrganization,
  organization.watchDeleteOrganization,

  event.watchGetEventList,
  event.watchGetEventById,
  event.watchGetEventsByOrganizationId,
  event.watchPostEvent,
  event.watchPatchEvent,
  event.watchDeleteEvent,

  eventMember.watchGetEventMembers,
  eventMember.watchGetEventMembersById,
  eventMember.watchPostEventMember,
  eventMember.watchPatchEventMember,
  eventMember.watchClaimEventMember,
  eventMember.watchUnclaimEventMember,
  eventMember.watchDeleteEventMember
);

export default rootSaga;
