import {
    USER_AUTH_ERROR,
    USER_AUTH_LOADING,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTRATION_SUCCESS
} from "../actions/authActions";

const initialState = {
    currentUser: {
        id: null,
        email: null,
    },
    isAuth: false,
    isLoading: false,
    error: ''
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_AUTH_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...state,
                currentUser: {
                    id: action.payload.id,
                    email: action.payload.email
                },
                isAuth: true,
                isProfileCreated: false,
                isLoading: false
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                currentUser: {
                    id: action.payload.id,
                    email: action.payload.email
                },
                isLoading: false,
                isProfileCreated: true,
                isAuth: true,
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        }
        case USER_AUTH_ERROR: {
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