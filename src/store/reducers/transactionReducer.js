import { uniqBy } from 'lodash';
import {
    ADD_TRANSACTION,
    SET_TRANSACTIONS,
    TRANSACTION_ACTION_ERROR,
    TRANSACTION_ACTION_LOADING
} from "../actions/transactionActions";

const initialState = {
    transactions: [],
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
                transactions: uniqBy(action.payload, "id").sort((x, y) => {
                    return new Date(x.created_at) - new Date(y.created_at);
                }),
                isLoading: false
            }
        }
        case ADD_TRANSACTION: {
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
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