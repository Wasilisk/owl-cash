
import {
    ADD_TRANSACTION,
    SET_TRANSACTIONS,
    TRANSACTION_ACTION_ERROR,
    TRANSACTION_ACTION_LOADING
} from "../actions/transactionActions";

const initialState = {
    transactions: [],
    userAmount: null,
    isLoading: false,
    error: ''
};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case TRANSACTION_ACTION_LOADING: {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case SET_TRANSACTIONS: {
            return {
                ...state,
                transactions: action.payload.transactions,
                userAmount: action.payload.userAmount,
                isLoading: false
            }
        }
        case ADD_TRANSACTION: {
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
                userAmount: state.userAmount - action.payload.amount,
                isLoading: false
            }
        }
        case TRANSACTION_ACTION_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        default: {
            return state;
        }
    }
}