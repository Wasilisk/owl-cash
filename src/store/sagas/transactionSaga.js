import {put, takeEvery} from "redux-saga/effects";
import {errorNotification} from "../../helpers/notifications";
import transactionApi from "../../http/transactionApi";
import {
    ADD_TRANSACTION,
    CREATE_TRANSACTION, GET_TRANSACTIONS,
    SET_TRANSACTIONS,
    TRANSACTION_ACTION_ERROR
} from "../actions/transactionActions";

function* createTransaction({transactionPayload}) {
    try {
        const transactionData = yield transactionApi.createTransaction(transactionPayload);
        if (transactionData.status >= 200 && transactionData.status < 300) {
            yield put({type: ADD_TRANSACTION, payload: transactionData.data[0]});
        } else {
            throw transactionData;
        }
    } catch (error) {
        yield put({type: TRANSACTION_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

function* getTranslations({userId}) {
    try {
        const incomingTransactions = yield transactionApi.getIncomingTransactions(userId);
        const outgoingTransactions = yield transactionApi.getOutgoingTransactions(userId);
        if ((incomingTransactions.status >= 200 && incomingTransactions.status < 300)
            && (outgoingTransactions.status >= 200 && outgoingTransactions.status < 300)) {
            yield put({
                type: SET_TRANSACTIONS,
                payload: [...outgoingTransactions.data, ...incomingTransactions.data]
            });
        } else {
            throw incomingTransactions.data.msg ? incomingTransactions : outgoingTransactions;
        }
    } catch (error) {
        yield put({type: TRANSACTION_ACTION_ERROR, error: error.data.msg});
        errorNotification(error.data.msg)
    }
}

export function* createTransactionSaga() {
    yield takeEvery(CREATE_TRANSACTION, createTransaction);
}

export function* getTransactionsSaga() {
    yield takeEvery(GET_TRANSACTIONS, getTranslations);
}