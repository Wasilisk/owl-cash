import {call, put, takeEvery} from "redux-saga/effects";
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

function* createTransaction({transactionPayload, setLoader, setStatus}) {
    try {
        yield call(setLoader, true)
        const transactionData = yield transactionApi.createTransaction(transactionPayload);
        const toProfile = yield profileApi.getProfilesById([transactionData.data[0].to])
        const userProfile = yield profileApi.getUserProfile(transactionPayload.from)

        transactionData.data[0].from = userProfile.data[0];
        transactionData.data[0].to = toProfile.data[0];

        if (transactionData.status >= 200 && transactionData.status < 300) {
            yield put({type: ADD_TRANSACTION, payload: transactionData.data[0]});
            yield call(setLoader, false)
            yield call(setStatus, "success")
        } else {
            throw new Error()
        }
    } catch {
        yield call(setLoader, false)
        yield call(setStatus, "error")
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

        const transactionData = _.map(sortedTransaction, function (transaction) {
            const addProfileByToParameter = _.extend(transaction,
                {to: _.find(userProfiles.data, {user: transaction.to})}
            );
            return _.extend(addProfileByToParameter,
                {from: _.find(userProfiles.data, {user: transaction.from})}
            );
        }).reverse();

        const userAmount = transactionData.reduce((amountValue, currentValue) => {
            if (currentValue.from.user === currentValue.to.user) {
                return amountValue + currentValue.amount
            } else if (currentValue.from.user === userId) {
                return amountValue - currentValue.amount;
            } else {
                return amountValue + currentValue.amount
            }
        }, 0)

        if ((incomingTransactions.status >= 200 && incomingTransactions.status < 300)
            && (outgoingTransactions.status >= 200 && outgoingTransactions.status < 300)) {
            yield put({
                type: SET_TRANSACTIONS,
                payload: {
                    transactions: transactionData,
                    userAmount
                }
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