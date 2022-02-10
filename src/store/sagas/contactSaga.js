import {errorNotification, successNotification} from "../../helpers/notifications";
import contactApi from "../../http/contactApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    ADD_CONTACT,
    ADD_CONTACT_REQUEST,
    CONTACT_ACTION_ERROR,
    CONTACT_ACTION_LOADING,
    DELETE_CONTACT,
    DELETE_CONTACT_REQUEST,
    GET_CONTACTS,
    SET_CONTACTS
} from "../actions/contactActions";
import profileApi from "../../http/profileApi";
import * as _ from "lodash";
import {PROFILE_ADD_TO_CONTACT} from "../actions/profileActions";

function* createContact({owner, contact}) {
    try {
        const contactData = yield contactApi.createContact(owner, contact);
        if (contactData.status >= 200 && contactData.status < 300) {
            yield put({type: ADD_CONTACT, payload: contactData.data[0]});
            yield put({type: PROFILE_ADD_TO_CONTACT, payload: {profileId: contact}})
            successNotification("Користувача додано до ваших контактів")
        } else {
            throw contactData;
        }
    } catch (error) {
        yield put({type: CONTACT_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* deleteContact({contactId}) {
    try {
        yield contactApi.deleteContact(contactId);
        yield put({type: DELETE_CONTACT, payload: contactId});
    } catch (error) {
        yield put({type: CONTACT_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* getContacts({userId}) {
    try {
        yield put({type: CONTACT_ACTION_LOADING});
        const contactsData = yield contactApi.getContacts(userId);
        const usersId = contactsData.data.map(contactInfo => contactInfo.contact)

        const userProfiles = yield profileApi.getProfilesById(usersId);

        const contactsProfiles = _.map(contactsData.data, (contactInfo) => {
            return _.extend(contactInfo,
                {contact: _.find(userProfiles.data, { user: contactInfo.contact })}
            );
        });

        if (contactsData.status >= 200 && contactsData.status < 300) {
            yield put({type: SET_CONTACTS, payload: contactsProfiles});
        } else {
            throw contactsData;
        }
    } catch (error) {
        yield put({type: CONTACT_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

export function* createContactSaga() {
    yield takeEvery(ADD_CONTACT_REQUEST, createContact);
}

export function* deleteContactSaga() {
    yield takeEvery(DELETE_CONTACT_REQUEST, deleteContact);
}

export function* getContactsSaga() {
    yield takeEvery(GET_CONTACTS, getContacts);
}