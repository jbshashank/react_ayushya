import {
    CREATE_BUSINESSCLIENTS_WATCHER,
    UPDATE_BUSINESSCLIENTS_WATCHER,
    FETCH_BUSINESSCLIENT_WATCHER,
    SET_BUSINESSCLIENT_LIST,
    SET_BUSINESSCLIENT_LIST_ERROR,

    SET_BUSINESSCLIENT,
    SET_BUSINESSCLIENT_ERROR,
    FETCH_BUSINESSCLIENT_BY_ID_WATCHER,
    SET_ClEAR
} from "../actionTypes";


export const createBusinessClientWatcher = (payload, resolve, reject) => {
    return {type: CREATE_BUSINESSCLIENTS_WATCHER, payload, resolve, reject}
};
export const updateBusinessClientWatcher = (payload, resolve, reject) => {
    return {type: UPDATE_BUSINESSCLIENTS_WATCHER, payload, resolve, reject}
};

export const fetchBusinessClientWatcher = (payload, resolve, reject) => {
    return {type: FETCH_BUSINESSCLIENT_WATCHER, payload, resolve, reject}
};
export const setBusinessClientList = (payload) => {
    return {type: SET_BUSINESSCLIENT_LIST, payload}
};
export const setBusinessClientListError = (payload) => {
    return {type: SET_BUSINESSCLIENT_LIST_ERROR, payload}
};
export const setBusinessClient = (payload) => {
    return {type: SET_BUSINESSCLIENT, payload}
};
export const setBusinessClientError = (payload) => {
    return {type: SET_BUSINESSCLIENT_ERROR, payload}
};
export const fetchBusinessClientByIdWatcher =(payload, resolve, reject )=>{
    return {type: FETCH_BUSINESSCLIENT_BY_ID_WATCHER, payload, resolve, reject}
}
export const clearBusinessClient = (payload) => {
    return {type: SET_ClEAR, payload}
};