export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const SET_TRANSACTIONS= "SET_TRANSACTIONS";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const TRANSACTION_ACTION_LOADING = "TRANSACTION_ACTION_LOADING";
export const TRANSACTION_ACTION_ERROR = "TRANSACTION_ACTION_ERROR";


export const createTransaction = (transactionPayload) => ({type: CREATE_TRANSACTION, transactionPayload});
export const getTransactions = (userId) => ({type: GET_TRANSACTIONS, userId});
