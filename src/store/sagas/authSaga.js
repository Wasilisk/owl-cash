import { put, takeEvery } from 'redux-saga/effects'
import Cookies from 'js-cookie';
import authApi from '../../http/authApi'
import {
    USER_AUTH_ERROR,
    USER_REGISTRATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN,
    USER_REGISTRATION, UPDATE_PASSWORD
} from "../actions/authActions";
import {errorNotification, successNotification} from "../../helpers/notifications";


function* userRegistration({email, password}) {
    try {
        const authData = yield authApi.registration(email, password);
        if (authData.status >= 200 && authData.status < 300) {
            yield put({type: USER_REGISTRATION_SUCCESS});
        } else {
            throw authData;
        }
    } catch (e) {
        yield put({type: USER_AUTH_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

function* userLogin({email, password}) {
    try {
        const authData = yield authApi.login(email, password);
        if (authData.status >= 200 && authData.status < 300) {
            Cookies.set("token", authData.data?.access_token)
            yield put({type: USER_LOGIN_SUCCESS, data: authData.data.user});
            successNotification("Ви успішно увійшли в систему !")
        } else {
            throw authData;
        }
    } catch (e) {
        yield put({type: USER_AUTH_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

function* updatePassword(new_password) {
    try {
        const authData = yield authApi.updatePassword(new_password);
        if (authData.status >= 200 && authData.status < 300) {
            successNotification("Пароль успішно змінено !")
        } else {
            throw authData;
        }
    } catch (e) {
        yield put({type: USER_AUTH_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

export function* loginSaga() {
    yield takeEvery(USER_LOGIN, userLogin)
}

export function* registrationSaga() {
    yield takeEvery(USER_REGISTRATION, userRegistration);
}

export function* updatePasswordSaga() {
    yield takeEvery(UPDATE_PASSWORD, updatePassword);
}


