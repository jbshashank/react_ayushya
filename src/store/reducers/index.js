import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import employees from './employees';
import pageLoader from './page_loader';
import employeeForm from './employeeForm';
import tickets from './tickets';
import businessclient from './businessclient'

const rootReducer = combineReducers({
    pageLoader, employees, form, employeeForm, tickets, businessclient
});

export default rootReducer;