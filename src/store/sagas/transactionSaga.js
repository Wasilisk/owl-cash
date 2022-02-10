import {put, takeEvery} from "redux-saga/effects";
import {errorNotification} from "../../helpers/notifications";
import * as _ from 'lodash';
import transactionApi from "../../http/transactionApi";
import {
    TRANSACTION_ACTION_LOADING,
    ADD_TRANSACTION,
    CREATE_TRANSACTION, GET_TRANSACTIONS,
    SET_TRANSACTIONS,
    TRANSACTION_ACTION_ERROR
} from "../actions/transactionActions";
import profileApi from "../../http/profileApi";

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
        yield put({type: TRANSACTION_ACTION_LOADING});
        const incomingTransactions = yield transactionApi.getIncomingTransactions(userId);
        const outgoingTransactions = yield transactionApi.getOutgoingTransactions(userId);

        const sortedTransaction = _.uniqBy([...outgoingTransactions.data, ...incomingTransactions.data], "id")
            .sort((x, y) => {
                return new Date(x.created_at) - new Date(y.created_at);
            })

        const keys = ["from", "to"];
        const usersId = _.flatten(sortedTransaction.map((transaction) => {
            return keys.map((key) => {
                return transaction[key];
            });
        }));

        const userProfiles = yield profileApi.getProfilesById(usersId);

        const transactionData = _.map(sortedTransaction, function(transaction){
            const addProfileByToParameter = _.extend(transaction,
                {to: _.find(userProfiles.data, { user: transaction.to })}
            );
            return _.extend(addProfileByToParameter,
                {from: _.find(userProfiles.data, { user: transaction.from })}
            );
        });

        if ((incomingTransactions.status >= 200 && incomingTransactions.status < 300)
            && (outgoingTransactions.status >= 200 && outgoingTransactions.status < 300)) {
            yield put({
                type: SET_TRANSACTIONS,
                payload: transactionData
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