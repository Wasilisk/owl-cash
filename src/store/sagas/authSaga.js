import { call, put, takeEvery } from 'redux-saga/effects'
import Cookies from 'js-cookie';
import authApi from '../../http/authApi'
import {
    USER_AUTH_ERROR,
    USER_REGISTRATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN,
    USER_REGISTRATION, UPDATE_PASSWORD, USER_AUTH_LOADING, PASSWORD_RECOVERY
} from "../actions/authActions";
import {errorNotification, successNotification} from "../../helpers/notifications";


function* userRegistration({email, password, meta}) {
    try {
        yield put({type: USER_AUTH_LOADING})
        const authData = yield authApi.registration(email, password);
        if (authData.status >= 200 && authData.status < 300) {
            yield put({type: USER_REGISTRATION_SUCCESS, payload: authData.data.user});
            yield call(meta.redirect, meta.path)
        } else {
            throw authData;
        }
    } catch (error) {
        yield put({type: USER_AUTH_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* userLogin({email, password, meta}) {
    try {
        yield put({type: USER_AUTH_LOADING})
        const authData = yield authApi.login(email, password);
        if (authData.status >= 200 && authData.status < 300) {
            Cookies.set("token", authData.data?.access_token)
            yield put({type: USER_LOGIN_SUCCESS, payload: authData.data.user});
            yield call(meta.redirect, meta.path)
            successNotification("Ви успішно увійшли в систему !")
        } else {
            throw authData;
        }
    } catch (error) {
        yield put({type: USER_AUTH_ERROR, error: error.data.error_description});
        errorNotification(error.data.error_description)
    }
}

function* passwordRecovery({email}) {
    try {
        const recoveryData = yield authApi.passwordRecovery(email);
        if (recoveryData.status >= 200 && recoveryData.status < 300) {
            successNotification("На вашу електронну пошту прийшов лист !")
        } else {
            throw recoveryData;
        }
    } catch (error) {
        yield put({type: USER_AUTH_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* updatePassword({accessToken, password, meta}) {
    try {
        const authData = yield authApi.updatePassword(accessToken, password);
        if (authData.status >= 200 && authData.status < 300) {
            yield call(meta.redirect, meta.path)
            successNotification("Пароль успішно змінено !")
        } else {
            throw authData;
        }
    } catch (error) {
        yield put({type: USER_AUTH_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

export function* loginSaga() {
    yield takeEvery(USER_LOGIN, userLogin)
}

export function* registrationSaga() {
    yield takeEvery(USER_REGISTRATION, userRegistration);
}

export function* passwordRecoveryData() {
    yield takeEvery(PASSWORD_RECOVERY, passwordRecovery);
}

export function* updatePasswordSaga() {
    yield takeEvery(UPDATE_PASSWORD, updatePassword);
}


