import {authHost} from "./index";

const contactApi = {
    createContact(owner, contact) {
        return authHost.post('rest/v1/contact', {owner, contact}, {
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
    deleteContact(contactId) {
        return authHost.delete(`rest/v1/contact?id=eq.${contactId}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            })
    },
    getTotalContacts(userId, searchKey, searchValue) {
        const searchString = searchKey && searchValue ? `${searchKey}=eq.${searchValue}` : ""
        return authHost.get(`rest/v1/contact?${searchString}&owner=eq.${userId}&select=id`, {
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
    getContactsById(userId, contactIds) {
        return authHost.get(`rest/v1/contact?owner=eq.${userId}&contact=in.(${contactIds.join(",")})&select=*`)
            .then(response => response)
            .catch((error) => {
                if (error.response) {
                    return error.response
                }
            })
    },
    getContacts(userId, from, to) {
        return authHost.get(`rest/v1/contact?owner=eq.${userId}&select=*`, {
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
    }
}

export default contactApi;