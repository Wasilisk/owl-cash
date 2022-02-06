import {authHost} from "./index";

const transactionApi = {
    createTransaction(transactionPayload) {
        return authHost.post(`rest/v1/transaction`, transactionPayload, {
            headers: {
                Prefer: "return=representation"
            }
        })
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    getIncomingTransactions(userId) {
        return authHost.get(`rest/v1/transaction?to=eq.${userId}&select=*`)
            .then(response => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            })
    },
    getOutgoingTransactions(userId) {
        return authHost.get(`rest/v1/transaction?from=eq.${userId}&select=*`)
            .then(response => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            })
    }
}

export default transactionApi;