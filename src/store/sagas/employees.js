import { call, put, takeLatest } from "redux-saga/effects";

import {
    FETCH_EMPLOYEES_WATCHER,
    CREATE_EMPLOYEES_WATCHER,
    DELETE_EMPLOYEES_WATCHER,
    UPDATE_EMPLOYEES_WATCHER,
    FETCH_EMPLOYEE_BY_ID_WATCHER,
    IMAGE_UPLOAD_WATCHER,
    FETCH_STATE_WATCHER,
    FETCH_CITY_WATCHER,
    FETCH_All_CITY_WATCHER,
} from "../actionTypes";
import * as firebase from "firebase";
import {
    setEmployees, setEmployeesError, setEmployeeForm,
    setPageLoaderFinish, setPageLoaderStart, setEmployee,
    setStates, setCity, setStatesError, setCityError, showToastMessage
} from "../actions";
import axios from "../../utils/axios";
import { BASE_URL_EMPLOYEE } from "../../utils/config";
import { BASE_URL_TICKETS, BASE_URL_GENERIC } from "../../utils/config";

function fetchEmployeesApi(data) {
    console.log("empreq ::::", axios.request({
        method: "get",
        url: `${BASE_URL_EMPLOYEE}userSearch?userSearch=${data.userSearch === undefined ? data.userSearch : ''}`
    }));
    return axios.request({
        method: "get",
        url: `${BASE_URL_EMPLOYEE}userSearch?userSearch=${data.userSearch === undefined ? '' : data.userSearch}`,
    });
}

function fetchStateApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_GENERIC}general/states/find`,
    });
}

function fetchCityApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_GENERIC}general/city/findAll?stateCode=${data.stateCode}`,
    });
}
//*fetch All CityApi* */
function fetchAllCityApi(data) {
    return axios.request({
        method: "get",
        // url: `${BASE_URL_GENERIC}general/city/findAll`,
        url: `${BASE_URL_GENERIC}general/city/findAllCitygeneral/city/findAllCity`
    });
}

function* fetchAllCityActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let { data } = yield call(fetchAllCityApi, payload);
        yield put(setCity(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setCityError(e));
        if (reject) reject(e);
    }
}
export function* fetchAllCityActionWatcher() {
    yield takeLatest(FETCH_All_CITY_WATCHER, fetchAllCityActionEffect);
}

//**End */

function* fetchEmployeesActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchEmployeesApi, payload);
        yield put(setPageLoaderFinish());
        yield put(setEmployees(data.content));
        if (resolve) resolve();
    } catch (e) {
        yield put(setEmployeesError(e));
        if (reject) reject(e);
    }
}

function* fetchStateActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        let { data } = yield call(fetchStateApi, payload);
        yield put(setStates(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setStatesError(e));
        if (reject) reject(e);
    }
}

function* fetchCityActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        let { data } = yield call(fetchCityApi, payload);
        yield put(setCity(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setCityError(e));
        if (reject) reject(e);
    }
}

export function* fetchEmployeesActionWatcher() {
    yield takeLatest(FETCH_EMPLOYEES_WATCHER, fetchEmployeesActionEffect);
}

export function* fetchStateActionWatcher() {
    yield takeLatest(FETCH_STATE_WATCHER, fetchStateActionEffect);
}

export function* fetchCityActionWatcher() {
    yield takeLatest(FETCH_CITY_WATCHER, fetchCityActionEffect);
}
function fetchEmployeeByIdApi(data) {
    return axios.request({
        method: "GET",
        url: `${BASE_URL_EMPLOYEE}users/user/userId?userId=` + data,
    });
}

function* fetchEmployeeByIdActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchEmployeeByIdApi, payload);
        yield put(setPageLoaderFinish());
        const employee = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            age: data.age,
        };
        yield put(setEmployeeForm(employee));
        yield put(setEmployee(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setEmployeesError(e));
        if (reject) reject(e);
    }
}

export function* fetchEmployeeByIdActionWatcher() {
    yield takeLatest(FETCH_EMPLOYEE_BY_ID_WATCHER, fetchEmployeeByIdActionEffect);
}

function createEmployeesApi(data) {
    return axios.request({
        method: 'post',
        url: `${BASE_URL_EMPLOYEE}users/user/add`,
        data: data,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
// async function fireBaseEmployeeCreate(data) {
//     var userId = null
//     await firebase.auth().createUserWithEmailAndPassword(data.employeePersonalDetails.empEmailAddress, data.employeePersonalDetails.empPhoneNumber).then(function () {
//         userId = firebase.auth().currentUser.uid;
//         console.log(":fireBaseEmployeeCreate:id", userId)
//     }).catch(function (error) {
//         console.log(error.message)
//     });
// }

function* createEmployeesActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(createEmployeesApi, payload);
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Employee created successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

// function* createEmployeesActionEffect(action) {
//     let { payload, resolve, reject } = action;

//     try {
//         yield call(createEmployeesApi, payload);
//         yield put(setPageLoaderStart());
//         yield call(fireBaseEmployeeCreate, payload);
//         Object.assign(payload.employeePersonalDetails, { "empFirebaseToken": firebase.auth().currentUser.uid })
//         console.log(firebase.auth().currentUser.uid);
//         if (firebase.auth().currentUser.uid) {
//             yield call(createEmployeesApi, payload);
//         }
//         yield put(setPageLoaderFinish());
//         if (resolve) resolve();
//         yield put(showToastMessage({ message: 'Employee created successfully', type: 'success' }));
//     } catch (e) {
//         if (reject) reject(e);
//         yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
//     }
// }

export function* createEmployeesActionWatcher() {
    yield takeLatest(CREATE_EMPLOYEES_WATCHER, createEmployeesActionEffect);
}


export function* updateEmployeesActionWatcher() {
    yield takeLatest(UPDATE_EMPLOYEES_WATCHER, updateEmployeesActionEffect);
}

function updateEmployeesApi(data) {

    return axios.request({
        method: "put",
        url: `${BASE_URL_EMPLOYEE}users/user/update?userId=${data.userId}`,
        data
    });
}

function* updateEmployeesActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(updateEmployeesApi, payload);
        yield put(setPageLoaderFinish());
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Employee updated successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    }
}


function deleteEmployeesApi(data) {
    return axios.request({
        method: "delete",
        url: `${BASE_URL_TICKETS}Employee/user/${data.id}`,
        data
    });
}

function* deleteEmployeesActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(deleteEmployeesApi, payload);
        yield put(setPageLoaderFinish());
        if (resolve) resolve();
    } catch (e) {
        if (reject) reject(e);
    }
}

export function* deleteEmployeesActionWatcher() {
    yield takeLatest(DELETE_EMPLOYEES_WATCHER, deleteEmployeesActionEffect);
}


function imageUploadApi(data) {
    return axios.request({
        method: "post",
        url: `${BASE_URL_TICKETS}Employee/user/upload`,
        data
    });
}

function* imageUploadActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(imageUploadApi, payload);
        yield put(setPageLoaderFinish());
        if (resolve) resolve(data);
    } catch (e) {
        if (reject) reject(e);
    }
}

export function* imageUploadActionWatcher() {
    yield takeLatest(IMAGE_UPLOAD_WATCHER, imageUploadActionEffect);
}
