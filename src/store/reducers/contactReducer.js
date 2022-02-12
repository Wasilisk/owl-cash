import {
    ADD_CONTACT,
    CONTACT_ACTION_ERROR,
    CONTACT_ACTION_LOADING,
    DELETE_CONTACT,
    SET_CONTACTS
} from "../actions/contactActions";

const initialState = {
    contacts: [],
    isLoading: false,
    totalContacts: null,
    error: ''
};

export default function contactReducer(state = initialState, action) {
    switch (action.type) {
        case CONTACT_ACTION_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case SET_CONTACTS: {
            return {
                ...state,
                contacts: action.payload.userContacts,
                totalContacts: action.payload.totalContacts,
                isLoading: false,
                error: ''
            }
        }
        case ADD_CONTACT: {
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        }
        case DELETE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        }
        case CONTACT_ACTION_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}