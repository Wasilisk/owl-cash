export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_AUTH_LOADING = "USER_AUTH_LOADING";
export const USER_REGISTRATION_SUCCESS = "USER_REGISTRATION_SUCCESS";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_AUTH_ERROR = "USER_AUTH_ERROR";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

export const userRegistration = (email, password) => ({type: USER_REGISTRATION, email, password});
export const loginRegistration = (email, password) => ({type: USER_LOGIN, email, password});
export const updatePassword = (new_password) => ({type: UPDATE_PASSWORD, new_password})