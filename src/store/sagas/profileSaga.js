import {call, put, takeEvery} from "redux-saga/effects";
import {errorNotification, successNotification} from "../../helpers/notifications";
import profileApi from "../../http/profileApi";
import {
    CREATE_PROFILE, GET_PROFILES, GET_USER_PROFILE,
    PROFILE_ACTION_ERROR,
    PROFILE_ACTION_LOADING, SET_PROFILES,
    SET_USER_PROFILE, UPDATE_PROFILE
} from "../actions/profileActions";
import contactApi from "../../http/contactApi";
import * as _ from "lodash";

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

function* getProfiles({userId, searchKey, searchValue, from, to}) {
    try {
        yield put({type: PROFILE_ACTION_LOADING})
        const totalProfiles = yield profileApi.getTotalProfiles(searchKey, searchValue);
        const profilesData = yield profileApi.getProfiles(searchKey, searchValue, from, to);

        const contactsId = profilesData.data.map(profileInfo => profileInfo.user)

        const contactsData = yield contactApi.getContactsById(userId, contactsId)

        const updatedProfilesData = _.map(profilesData.data, (profileInfo) => {
            return _.extend(profileInfo,
                {isUserContact: _.includes(_.map(contactsData.data, 'contact'), profileInfo.user)}
            );
        });

        if (profilesData.status >= 200 && profilesData.status < 300) {
            yield put({
                type: SET_PROFILES, payload: {
                    userProfiles: updatedProfilesData,
                    totalProfiles: +totalProfiles.headers["content-range"].split("/")[1]
                }
            });
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
