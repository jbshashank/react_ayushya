import {
    SET_EMPLOYEES_ERROR,
    SET_EMPLOYEES,
    SET_EMPLOYEE,
    SET_STATES,
    SET_CITY,
    SET_STATES_ERROR,
    SET_CITY_ERROR
} from "../actionTypes";

const INITIAL_STATE = {
    employees: [],
    states: [],
    cities: [],
    // roles: ['Admin', 'Manager', 'Service Engineer'],
    employee: null,
    error: null
};

const employees = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:
            return {
                ...state,
                employee: action.payload
            };
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case SET_EMPLOYEES_ERROR:
        case SET_STATES_ERROR:
        case SET_CITY_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_STATES:
            return {
                ...state,
                states: action.payload
            };
        case SET_CITY:
            return {
                ...state,
                cities: action.payload
            };
        default:
            return state
    }
};
export default employees;