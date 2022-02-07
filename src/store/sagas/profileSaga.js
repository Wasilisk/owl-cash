import {call, put, takeEvery} from "redux-saga/effects";
import {errorNotification, successNotification} from "../../helpers/notifications";
import profileApi from "../../http/profileApi";
import {
    CREATE_PROFILE, GET_PROFILES, GET_USER_PROFILE,
    PROFILE_ACTION_ERROR,
    PROFILE_ACTION_LOADING, SET_PROFILES,
    SET_USER_PROFILE, UPDATE_PROFILE
} from "../actions/profileActions";

function* getUserProfile({userId}) {
    try {
        yield put({type: PROFILE_ACTION_LOADING})
        const userProfileData = yield profileApi.getUserProfile(userId);
        if (userProfileData.status >= 200 && userProfileData.status < 300) {
            yield put({type: SET_USER_PROFILE, payload: userProfileData.data[0]});
        } else {
            throw userProfileData;
        }
    } catch (error) {
        yield put({type: PROFILE_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* createProfile({profilePayload, meta}) {
    try {
        const profileData = yield profileApi.createProfile(profilePayload);
        if (profileData.status >= 200 && profileData.status < 300) {
            yield put({type: SET_USER_PROFILE, payload: profileData.data[0]});
            successNotification("Profile created successful");
            yield call(meta.redirect, meta.path);
        } else {
            throw profileData;
        }
    } catch (error) {
        yield put({type: PROFILE_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* updateProfile({updateValues}) {
    try {
        yield put({type: PROFILE_ACTION_LOADING})
        const profileData = yield profileApi.updateProfile(updateValues);
        if (profileData.status >= 200 && profileData.status < 300) {
            yield put({type: SET_USER_PROFILE, payload: profileData.data[0]});
            successNotification("Профіль створено успішно !")
        } else {
            throw profileData;
        }
    } catch (error) {
        yield put({type: PROFILE_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
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
    } catch (error) {
        yield put({type: PROFILE_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}


export function* getUserProfileSaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfile)
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