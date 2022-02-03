import {errorNotification} from "../../helpers/notifications";
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

function* createContact({owner, contact}) {
    try {
        const contactData = yield contactApi.createContact(owner, contact);
        if (contactData.status >= 200 && contactData.status < 300) {
            yield put({type: ADD_CONTACT, payload: contactData.data[0]});
        } else {
            throw contactData;
        }
    } catch (e) {
        yield put({type: CONTACT_ACTION_ERROR, error: e.data?.error_description});
        errorNotification(e.data?.error_description)
    }
}

function* deleteContact({contactId}) {
    try {
        yield contactApi.deleteContact(contactId);
        yield put({type: DELETE_CONTACT, payload: contactId});
    } catch (e) {
        yield put({type: CONTACT_ACTION_ERROR, error: e});
        errorNotification(e)
    }
}

function* getContacts({userId}) {
    try {
        yield put({type: CONTACT_ACTION_LOADING});
        const contactsData = yield contactApi.getContacts(userId);
        if (contactsData.status >= 200 && contactsData.status < 300) {
            yield put({type: SET_CONTACTS, payload: contactsData.data});
        } else {
            throw contactsData;
        }
    } catch (e) {
        yield put({type: CONTACT_ACTION_ERROR, error: e});
        errorNotification(e)
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