import {combineReducers} from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    contact: contactReducer
});

export default rootReducer;