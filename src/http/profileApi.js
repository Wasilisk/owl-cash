import {authHost} from "./index";

const profileApi = {
    getProfiles(searchKey, searchValue) {
        const searchString = searchValue && searchValue ? `${searchKey}=eq.${searchValue}` : ""
        return authHost.get(`rest/v1/profile?${searchString}&select=*`)
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