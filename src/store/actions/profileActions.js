export const PROFILE_ACTION_LOADING = "PROFILE_ACTION_LOADING";
export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const CREATE_PROFILE = "CREATE_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_PROFILES = "SET_PROFILES";
export const GET_PROFILES = "GET_PROFILES";
export const PROFILE_ACTION_ERROR = "PROFILE_ACTION_ERROR";


export const getUserProfile = (userId) => ({type: GET_USER_PROFILE, userId});
export const createProfile = (profilePayload, meta) => ({type: CREATE_PROFILE, profilePayload, meta});
export const updateProfile = (updateValues) => ({type: UPDATE_PROFILE, updateValues});
export const getProfiles = (searchKey, searchValue) => ({type: GET_PROFILES, searchKey, searchValue})