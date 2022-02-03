import {put, takeEvery} from "redux-saga/effects";
import {errorNotification} from "../../helpers/notifications";
import profileApi from "../../http/profileApi";
import {
    CREATE_PROFILE, GET_PROFILES,
    PROFILE_ACTION_ERROR,
    PROFILE_ACTION_LOADING, SET_PROFILES,
    SET_USER_PROFILE, UPDATE_PROFILE
} from "../actions/profileActions";

function* createProfile({profilePayload}) {
    try {
        const profileData = yield profileApi.createProfile(profilePayload);
        if (profileData.status >= 200 && profileData.status < 300) {
            yield put({type: SET_USER_PROFILE, payload: profileData.data[0]});
        } else {
            throw profileData;
        }
    } catch (e) {
        yield put({type: PROFILE_ACTION_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

function* updateProfile({updateValues}) {
    try {
        yield put({type: PROFILE_ACTION_LOADING})
        const profileData = yield profileApi.updateProfile(updateValues);
        if (profileData.status >= 200 && profileData.status < 300) {
            yield put({type: SET_USER_PROFILE, payload: profileData.data[0]});
        } else {
            throw profileData;
        }
    } catch (e) {
        yield put({type: PROFILE_ACTION_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

function* getProfiles({searchKey, searchValue}) {
    try {
        yield put({type: PROFILE_ACTION_LOADING})
        const profilesData = yield profileApi.getProfiles(searchKey, searchValue);
        if (profilesData.status >= 200 && profilesData.status < 300) {
            yield put({type: SET_PROFILES, payload: profilesData.data});
        } else {
            throw profilesData;
        }
    } catch (e) {
        yield put({type: PROFILE_ACTION_ERROR, error: e.data.error_description});
        errorNotification(e.data.error_description)
    }
}

export function* createProfileSaga() {
    yield takeEvery(CREATE_PROFILE, createProfile)
}

export function* updateProfileSaga() {
    yield takeEvery(UPDATE_PROFILE, updateProfile)
}

export function* getProfilesSaga() {
    yield takeEvery(GET_PROFILES, getProfiles)
}