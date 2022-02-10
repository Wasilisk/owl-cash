import { all } from 'redux-saga/effects'
import {loginSaga, passwordRecoveryData, registrationSaga, updatePasswordSaga} from "./authSaga";
import {
    createProfileSaga,
    getProfilesSaga,
    getUserProfileSaga,
    updateProfileSaga
} from "./profileSaga";
import {createContactSaga, deleteContactSaga, getContactsSaga} from "./contactSaga";
import {createTransactionSaga, getTransactionsSaga} from "./transactionSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),
        registrationSaga(),
        updatePasswordSaga(),
        getUserProfileSaga(),
        createProfileSaga(),
        passwordRecoveryData(),
        updateProfileSaga(),
        getProfilesSaga(),
        createContactSaga(),
        deleteContactSaga(),
        getContactsSaga(),
        createTransactionSaga(),
        getTransactionsSaga()
    ])
}