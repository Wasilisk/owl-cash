import {authHost, host} from "./index";

const authApi = {
    registration(email, password) {
        return host.post('auth/v1/signup', {email, password})
            .then(response => response)
            .catch((error) => {
                if( error.response ){
                    return error.response
                }
            })
    },
    login(email, password) {
        return host.post('auth/v1/token?grant_type=password', {email, password})
            .then(response => {
                return response
            })
            .catch((error) => {
                if( error.response ){
                   return error.response;
                }
            })
    },
    updatePassword(password) {
        return authHost.put('auth/v1/user', {password})
            .then(response => {
                return response
            })
            .catch((error) => {
                if( error.response ){
                    return error.response;
                }
            })
    }
}

export default authApi;