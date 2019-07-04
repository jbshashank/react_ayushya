import {
    FETCH_EMPLOYEES_WATCHER,
    SET_EMPLOYEES,
    SET_EMPLOYEES_ERROR,
    SET_EMPLOYEE,
    CREATE_EMPLOYEES_WATCHER,
    DELETE_EMPLOYEES_WATCHER,
    UPDATE_EMPLOYEES_WATCHER,
    FETCH_EMPLOYEE_BY_ID_WATCHER,
    IMAGE_UPLOAD_WATCHER,
    FETCH_CITY_WATCHER,
    FETCH_STATE_WATCHER,
    SET_STATES,
    SET_CITY,
    SET_STATES_ERROR,
    SET_CITY_ERROR,
    FETCH_All_CITY_WATCHER
} from "../actionTypes";

export const fetchEmployeesWatcher = (payload, resolve, reject) => {
    return {type: FETCH_EMPLOYEES_WATCHER, payload, resolve, reject}
};

export const fetchEmployeeByIdWatcher = (payload, resolve, reject) => {
    return {type: FETCH_EMPLOYEE_BY_ID_WATCHER, payload, resolve, reject}
};

export const setEmployees = (payload) => {
    return {type: SET_EMPLOYEES, payload}
};

export const setEmployee = (payload) => {
    return {type: SET_EMPLOYEE, payload}
};

export const setEmployeesError = (payload) => {
    return {type: SET_EMPLOYEES_ERROR, payload}
};

export const createEmployeesWatcher = (payload, resolve, reject) => {
    return {type: CREATE_EMPLOYEES_WATCHER, payload, resolve, reject}
};

export const updateEmployeesWatcher = (payload, resolve, reject) => {
    return {type: UPDATE_EMPLOYEES_WATCHER, payload, resolve, reject}
};

export const deleteEmployeesWatcher = (payload, resolve, reject) => {
    return {type: DELETE_EMPLOYEES_WATCHER, payload, resolve, reject}
};

export const imageUploadWatcher = (payload, resolve, reject) => {
    return {type: IMAGE_UPLOAD_WATCHER, payload, resolve, reject}
};

export const fetchStateWatcher = (payload, resolve, reject) => {
    return {type: FETCH_STATE_WATCHER, payload, resolve, reject}
};
export const fetchAllCityWatcher = (payload, resolve, reject) => {
    return {type: FETCH_All_CITY_WATCHER, payload, resolve, reject}
};
export const fetchCityWatcher = (payload, resolve, reject) => {
    return {type: FETCH_CITY_WATCHER, payload, resolve, reject}
};
export const setStates = (payload) => {
    return {type: SET_STATES, payload}
};

export const setStatesError = (payload) => {
    return {type: SET_STATES_ERROR, payload}
};

export const setCity = (payload) => {
    return {type: SET_CITY, payload}
};

export const setCityError = (payload) => {
    return {type: SET_CITY_ERROR, payload}
};
