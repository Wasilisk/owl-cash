export const getRequestString = (params) => {
    let requestParams = "";
    for (const [key, value] of Object.entries(params)) {
        requestParams += `${key}=eq.${value}`;
    }
    return requestParams;
}