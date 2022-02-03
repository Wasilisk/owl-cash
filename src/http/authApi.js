import {authHost, host} from "./index";

const authApi = {
    registration(email, password) {
        return host.post('/signup', {email, password})
            .then(response => response)
            .catch((error) => {
                if( error.response ){
                    return error.response
                }
            })
    },
    login(email, password) {
        return host.post('/token?grant_type=password', {email, password})
            .then(response => {
                return response
            })
            .catch((error) => {
                if( error.response ){
                   return error.response;
                }
            })
    },
    updatePassword(new_password) {
        return authHost.put('/user', {new_password})
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