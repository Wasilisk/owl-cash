import {combineReducers} from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

export default rootReducer;