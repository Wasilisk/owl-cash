import { all } from 'redux-saga/effects'
import {loginSaga, registrationSaga, updatePasswordSaga} from "./authSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),
        registrationSaga(),
        updatePasswordSaga(),
    ])
}