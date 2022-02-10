import {authHost} from "./index";

const profileApi = {
    getUserProfile(userId) {
        return authHost.get(`rest/v1/profile?user=eq.${userId}&select=*`)
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    getProfiles(searchKey, searchValue, from, to) {
        const searchString = searchKey && searchValue ? `${searchKey}=eq.${searchValue}` : ""
        return authHost.get(`rest/v1/profile?${searchString}&select=*`, {
            headers: {
                Range: `${from}-${to}`
            }
        })
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    getTotalProfiles(searchKey, searchValue) {
        const searchString = searchKey && searchValue ? `${searchKey}=eq.${searchValue}` : ""
        return authHost.get(`rest/v1/profile?${searchString}&select=id`, {
            headers: {
                Range: "0-0",
                Prefer: "count=exact,head=true"
            }
        })
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    getProfilesById(usersId) {
        return authHost.get(`rest/v1/profile?user=in.(${usersId.join(",")})&select=*`)
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    createProfile(profilePayload) {
        return authHost.post(`rest/v1/profile`, profilePayload, {
            headers: {
                Prefer: "return=representation"
            }
        })
            .then(response => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            })
    },
    updateProfile({userId, ...updateValues}) {
        return authHost.patch(`rest/v1/profile?user=eq.${userId}`, {...updateValues}, {
            headers: {
                Prefer: "return=representation"
            }
        })
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

export default profileApi;