import {
    PROFILE_ACTION_ERROR,
    PROFILE_ACTION_LOADING, PROFILE_ADD_TO_CONTACT,
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
    totalProfiles: null,
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
                userProfiles: action.payload.userProfiles.filter(profile => profile.id !== state.currentProfile.id),
                isLoading: false,
                totalProfiles: action.payload.totalProfiles
            }
        }
        case PROFILE_ADD_TO_CONTACT: {
            return {
                ...state,
                userProfiles: state.userProfiles.map(profile => {
                    return profile.user === action.payload.profileId
                        ? {...profile, isUserContact: true}
                        : profile
                })
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