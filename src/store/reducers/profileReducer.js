import {
    PROFILE_ACTION_ERROR,
    PROFILE_ACTION_LOADING,
    SET_PROFILES,
    SET_USER_PROFILE
} from "../actions/profileActions";

const initialState = {
    currentProfile: {
        id: null,
        firstName: null,
        lastName: null,
        email: null
    },
    userProfiles: [],
    isLoading: false,
    error: ''
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_ACTION_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                currentProfile: {
                    id: action.payload.id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email
                },
                isLoading: false
            }
        }
        case SET_PROFILES: {
            return {
                ...state,
                userProfiles: action.payload.filter(profile => profile.id !== state.currentProfile.id)
            }
        }
        case PROFILE_ACTION_ERROR: {
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