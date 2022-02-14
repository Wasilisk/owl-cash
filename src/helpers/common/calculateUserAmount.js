
export const calculateUserAmount = (transactionData, userId) => {
    return transactionData.reduce((amountValue, currentValue) => {
        if (currentValue.from.user === currentValue.to.user) {
            return amountValue + currentValue.amount
        } else if (currentValue.from.user === userId) {
            return amountValue - currentValue.amount;
        } else {
            return amountValue + currentValue.amount
        }
    }, 0)
}