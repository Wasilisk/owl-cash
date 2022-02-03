export const CONTACT_ACTION_LOADING="CONTACT_ACTION_LOADING";
export const GET_CONTACTS="GET_CONTACTS";
export const SET_CONTACTS="SET_CONTACTS";
export const ADD_CONTACT_REQUEST="ADD_CONTACT_REQUEST";
export const ADD_CONTACT="ADD_CONTACT";
export const DELETE_CONTACT_REQUEST="DELETE_CONTACT_REQUEST";
export const DELETE_CONTACT="DELETE_CONTACT";
export const CONTACT_ACTION_ERROR="CONTACT_ACTION_ERROR";

export const getContacts = (userId) => ({type: GET_CONTACTS, userId})
export const createContact = (owner, contact) => ({type: ADD_CONTACT_REQUEST, owner, contact});
export const deleteContact = (contactId) => ({type: DELETE_CONTACT_REQUEST, contactId});
