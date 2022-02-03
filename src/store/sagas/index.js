import { all } from 'redux-saga/effects'
import {loginSaga, registrationSaga, updatePasswordSaga} from "./authSaga";
import {createProfileSaga, getProfilesSaga, updateProfileSaga} from "./profileSaga";
import {createContactSaga, deleteContactSaga, getContactsSaga} from "./contactSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),
        registrationSaga(),
        updatePasswordSaga(),
        createProfileSaga(),
        updateProfileSaga(),
        getProfilesSaga(),
        createContactSaga(),
        deleteContactSaga(),
        getContactsSaga()
    ])
}