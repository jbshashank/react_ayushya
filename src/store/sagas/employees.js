import {call, put, takeLatest} from "redux-saga/effects";

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
import {BASE_URL_TICKETS} from "../../utils/config";

function fetchEmployeesApi(data) {
    console.log("value of data:::in fetchEMP::",data)
    console.log("empreq ::::",   axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}Employee/user/search?searchParam=${data.searchParam===undefined?data.searchParam:''}`,
    }))
    return axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}Employee/user/search?searchParam=${data.searchParam===undefined?'':data.searchParam}`,
    });
 }
 
function fetchStateApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}/Employee/utils/getstates`,
    });
}

function fetchCityApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}/Employee/utils/${data.state_id}/getcity`,
    });
}//*fetch All CityApi* */
function fetchAllCityApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}/Employee/utils/getAllcity`,
    });
}

function* fetchAllCityActionEffect(action) {
    let {payload, resolve, reject} = action;
    try {
        let {data} = yield call(fetchAllCityApi, payload);
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
    let {payload, resolve, reject} = action;

    try {
        yield put(setPageLoaderStart());
        let {data} = yield call(fetchEmployeesApi, payload);
        yield put(setPageLoaderFinish());
        yield put(setEmployees(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setEmployeesError(e));
        if (reject) reject(e);
    }
}

function* fetchStateActionEffect(action) {
    let {payload, resolve, reject} = action;

    try {
        let {data} = yield call(fetchStateApi, payload);
        yield put(setStates(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setStatesError(e));
        if (reject) reject(e);
    }
}

function* fetchCityActionEffect(action) {
    let {payload, resolve, reject} = action;

    try {
        let {data} = yield call(fetchCityApi, payload);
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
        method: "get",
        url: `${BASE_URL_TICKETS}Employee/user/` + data,
    });
}

function* fetchEmployeeByIdActionEffect(action) {
    let {payload, resolve, reject} = action;

    try {
        yield put(setPageLoaderStart());
        let {data} = yield call(fetchEmployeeByIdApi, payload);
        yield put(setPageLoaderFinish());
        const employee = {
            firstName: data.employeePersonalDetails.empFirstName,
            middleName: data.employeePersonalDetails.empMiddleName,
            lastName: data.employeePersonalDetails.empLastName,
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
        method: "post",
        url: `${BASE_URL_TICKETS}Employee/user/create`,
        data
    });
}
async function fireBaseEmployeeCreate(data)
{
    var userId=null
    await firebase.auth().createUserWithEmailAndPassword(data.employeePersonalDetails.empEmailAddress, data.employeePersonalDetails.empPhoneNumber).then(function(){     
        userId=firebase.auth().currentUser.uid;
        console.log(":fireBaseEmployeeCreate:id",userId)
    }).catch(function(error) {
        console.log(error.message)
    });   
}

function* createEmployeesActionEffect(action) {
    let {payload, resolve, reject} = action;

    try {
        yield put(setPageLoaderStart());
        yield call( fireBaseEmployeeCreate, payload);
        Object.assign(payload.employeePersonalDetails,{"empFirebaseToken":firebase.auth().currentUser.uid})
        console.log(firebase.auth().currentUser.uid);
        if(firebase.auth().currentUser.uid){
            yield call(createEmployeesApi, payload);
        }
        yield put(setPageLoaderFinish());
        if (resolve) resolve();
        yield put(showToastMessage({message: 'Employee created successfully', type: 'success'}));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({message: 'Internal error, Try again', type: 'error'}));
    }
}

export function* createEmployeesActionWatcher() {
    yield takeLatest(CREATE_EMPLOYEES_WATCHER, createEmployeesActionEffect);
}


export function* updateEmployeesActionWatcher() {
    yield takeLatest(UPDATE_EMPLOYEES_WATCHER, updateEmployeesActionEffect);
}

function updateEmployeesApi(data) {

    return axios.request({
        method: "put",
        url: `${BASE_URL_TICKETS}Employee/user/update`,
        data
    });
}

function* updateEmployeesActionEffect(action) {
    let {payload, resolve, reject} = action;

    try {
        yield put(setPageLoaderStart());
        yield call(updateEmployeesApi, payload);
        yield put(setPageLoaderFinish());
        if (resolve) resolve();
        yield put(showToastMessage({message: 'Employee updated successfully', type: 'success'}));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({message: 'Internal error, Try again', type: 'error'}));
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
    let {payload, resolve, reject} = action;

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
    let {payload, resolve, reject} = action;

    try {
        yield put(setPageLoaderStart());
        let {data} = yield call(imageUploadApi, payload);
        yield put(setPageLoaderFinish());
        if (resolve) resolve(data);
    } catch (e) {
        if (reject) reject(e);
    }
}

export function* imageUploadActionWatcher() {
    yield takeLatest(IMAGE_UPLOAD_WATCHER, imageUploadActionEffect);
}
