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
    getContacts(userId) {
        return authHost.get(`rest/v1/contact?owner=eq.${userId}&select=*`)
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

export default contactApi;