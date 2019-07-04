import {SET_EMPLOYEE_FORM} from "../actionTypes";

const INITIAL_STATE = {
    firstName: '',
    middleName: '',
    lastName: '',
    aboutMe: '',
    address: '',
    dob: new Date(),
    doj: new Date(),
    location: '',
    photo: '',
    skills: '',
    expLevel: '',
    salary: '',
    fingerPrint: '',
    gender: ''
};

const employees = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_EMPLOYEE_FORM:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};
export default employees;