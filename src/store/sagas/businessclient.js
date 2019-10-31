import { call, put, takeLatest } from "redux-saga/effects";

import {
    CREATE_BUSINESSCLIENTS_WATCHER,
    // UPDATE_BUSINESSCLIENTS_WATCHER,
    // FETCH_BUSINESSCLIENT_WATCHER,
    // FETCH_BUSINESSCLIENT_BY_ID_WATCHER,

} from "../actionTypes";
import { setBusinessClientList, setBusinessClientListError, setBusinessClient, setBusinessClientError } from "../actions";
import {
    setPageLoaderStart,
    setPageLoaderFinish,
    showToastMessage,
    clearBusinessClient

} from "../actions";
import axios from "../../utils/axios";
import { BASE_URL, BASE_URL_TICKETS, BASE_URL_CLIENTS } from "../../utils/config";

//** create Business Client *//
function createbusinessClientApi(data) {
    return axios.request({
        method: "post",
        url: `${BASE_URL_CLIENTS}clients/create`,
        data
    });
}

function* createBusinessClientActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(createbusinessClientApi, payload);
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Business Client  created successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* createBusinessClientActionWatcher() {
    yield takeLatest(CREATE_BUSINESSCLIENTS_WATCHER, createBusinessClientActionEffect);
}
//**END */

// ** update Business Client *//

function updatebusinessClientApi(data) {

    return axios.request({
        method: "put",
        url: `${BASE_URL_TICKETS}Employee/businessclient/${data.id}`,
        data
    })
}
function* updateBusinessClientApiActionEffect(action) {

    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(updatebusinessClientApi, payload);
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Business Client updated successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* updateBusinessClientActionWatcher() {
    yield takeLatest(UPDATE_BUSINESSCLIENTS_WATCHER, updateBusinessClientApiActionEffect)

}
//** Get all Business Client*/
function fetchBusinessClientsApi(payload) {
    // let url = `http://localhost:8098/clients/findAll`;
    return axios.request({
        method: "get",
        url: 'http://localhost:8098/clients/findAll'
    });
}
function* fetchBusinessClientsApiEffect(action) {
    let { payload, resolve, reject } = action;
    console.log("inside :fetchBusinessClientsApiEffect:", action)

    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchBusinessClientsApi, payload);
        yield put(setBusinessClientList(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setBusinessClientListError(e));
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }

}
export function* fetchBusinessClientActionWatcher() {
    yield takeLatest(FETCH_BUSINESSCLIENT_WATCHER, fetchBusinessClientsApiEffect);
}


// ** * /
//     **  //** Get Business Client by id*/ */
function fetchBusinessClientByIdApi(payload) {
    let url = `${BASE_URL_TICKETS}Employee/businessclient/${payload}`;
    return axios.request({
        method: "get",
        url: url,
    });
}
function* fetchBusinessClientByIdApiEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchBusinessClientByIdApi, payload);
        yield put(setBusinessClient(data));
        //  yield put (clearBusinessClient());
        if (resolve) resolve();
    } catch (e) {
        yield put(setBusinessClientError(e));
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }

}
export function* fetchBusinessClientByIdActionWatcher() {
    yield takeLatest(FETCH_BUSINESSCLIENT_BY_ID_WATCHER, fetchBusinessClientByIdApiEffect);
}
//  //**End */