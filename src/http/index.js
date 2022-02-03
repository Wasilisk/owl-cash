import * as axios from "axios";
import Cookies from "js-cookie";

const host = axios.create({
    baseURL: "https://lassognchwmnevcbvdwb.supabase.co/auth/v1",
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
    }
})

const authHost = axios.create({
    baseURL: "https://lassognchwmnevcbvdwb.supabase.co/auth/v1",
    headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,

    }
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${Cookies.get("token")}`
}

authHost.interceptors.request.use(authInterceptor)

export {
    host,
    authHost
}

