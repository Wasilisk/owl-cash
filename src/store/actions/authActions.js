export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_AUTH_LOADING = "USER_AUTH_LOADING";
export const USER_REGISTRATION_SUCCESS = "USER_REGISTRATION_SUCCESS";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_AUTH_ERROR = "USER_AUTH_ERROR";
export const PASSWORD_RECOVERY = "PASSWORD_RECOVERY"
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

export const userRegistration = (email, password, meta) => ({type: USER_REGISTRATION, email, password, meta});
export const userLogin = (email, password, meta) => ({type: USER_LOGIN, email, password, meta});
export const userLogout = () => ({type: USER_LOGOUT})
export const passwordRecovery = (email) => ({type: PASSWORD_RECOVERY, email})
export const updatePassword = (accessToken, password, meta) => ({type: UPDATE_PASSWORD, accessToken, password, meta})