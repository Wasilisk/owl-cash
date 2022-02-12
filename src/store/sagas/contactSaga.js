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

function* createContact({owner, contact, setLoader}) {
    try {
        setLoader(true);
        const contactData = yield contactApi.createContact(owner, contact);
        if (contactData.status >= 200 && contactData.status < 300) {
            yield put({type: ADD_CONTACT, payload: contactData.data[0]});
            yield put({type: PROFILE_ADD_TO_CONTACT, payload: {profileId: contact}})
            setLoader(false);
            successNotification("Користувача додано до ваших контактів")
        } else {
            throw contactData;
        }
    } catch (error) {
        yield put({type: CONTACT_ACTION_ERROR, error: error.data.msg});
        setLoader(false);
        errorNotification(error.data.msg)
    }
}

function* deleteContact({contactId, setIsLoading}) {
    try {
        setIsLoading(true);
        yield contactApi.deleteContact(contactId);
        yield put({type: DELETE_CONTACT, payload: contactId});
        setIsLoading(false);
        successNotification("Користувача вилучено з ваших контактів")
    } catch (error) {
        yield put({type: CONTACT_ACTION_ERROR, error: error.data.msg});
        setIsLoading(false);
        errorNotification(error.data.msg)
    }
}

function* getContacts({userId, searchKey, searchValue, from, to}) {
    try {
        if(searchKey && searchValue) {
            yield put({type: CONTACT_ACTION_LOADING});
            const profilesByValue = yield profileApi.getProfiles(searchKey, searchValue, from, to);
            const profileIds = profilesByValue.data.map(profileInfo => profileInfo.user);
            const totalContacts = yield contactApi.getTotalContacts(userId);

            const contactById = yield contactApi.getContactsById(userId, profileIds);

            const contactsProfiles = _.map(contactById.data, (contactInfo) => {
                return _.extend(contactInfo,
                    {contact: _.find(profilesByValue.data, { user: contactInfo.contact })}
                );
            });
            console.log(contactsProfiles)
            if (contactById.status >= 200 && contactById.status < 300) {
                yield put({type: SET_CONTACTS, payload: {
                        userContacts: contactsProfiles,
                        totalContacts: +totalContacts.headers["content-range"].split("/")[1]
                    }});
            } else {
                throw contactsProfiles;
            }
        } else {
            yield put({type: CONTACT_ACTION_LOADING});
            const totalContacts = yield contactApi.getTotalContacts(userId);
            const contactsData = yield contactApi.getContacts(userId, from, to);
            const usersId = contactsData.data.map(contactInfo => contactInfo.contact)

            const userProfiles = yield profileApi.getProfilesById(usersId);

            const contactsProfiles = _.map(contactsData.data, (contactInfo) => {
                return _.extend(contactInfo,
                    {contact: _.find(userProfiles.data, { user: contactInfo.contact })}
                );
            });

            if (contactsData.status >= 200 && contactsData.status < 300) {
                yield put({type: SET_CONTACTS, payload: {
                        userContacts: contactsProfiles,
                        totalContacts: +totalContacts.headers["content-range"].split("/")[1]
                    }});
            } else {
                throw contactsData;
            }
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