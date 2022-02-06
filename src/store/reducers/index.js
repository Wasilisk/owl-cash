import {combineReducers} from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import contactReducer from "./contactReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    contact: contactReducer,
    transaction: transactionReducer
});

export default rootReducer;