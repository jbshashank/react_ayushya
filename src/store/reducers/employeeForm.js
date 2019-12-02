import { SET_EMPLOYEE_FORM } from "../actionTypes";
import moment from "moment";

const INITIAL_STATE = {
    firstName: '',
    middleName: '',
    lastName: '',
    aboutMe: '',
    dateOfBirth: +new Date(),
    dateOfJoining: +new Date(),
    email: '',
    phoneNumber: '',
    // photo: [],
    skills: '',
    expertiseLevel: '',
    role: '',
    // fingerprint: '',
    salary: '',
    age: '',
    addr: '',
    city: '',
    state: '',
    pinCode: '',
    userEducationDetailsDataModels: [],
    gender: '',
    userId: ''
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