import {all} from "redux-saga/effects";

import {
    fetchEmployeesActionWatcher,
    createEmployeesActionWatcher,
    deleteEmployeesActionWatcher,
    updateEmployeesActionWatcher,
    fetchEmployeeByIdActionWatcher,
    imageUploadActionWatcher,
    fetchStateActionWatcher,
    fetchCityActionWatcher,
    fetchAllCityActionWatcher,
} from "./employees";

import {
    fetchTicketByIdActionWatcher,
    fetchTicketsActionWatcher,
    updateTicketsActionWatcher,
    createTicketsActionWatcher,
    deleteTicketsActionWatcher,
    uploadTicketsActionWatcher,
    fetchBrandActionWatcher,
    fetchProductActionWatcher,
    fetchModelActionWatcher,
    createBulkTicketsActionWatcher,
    fetchAllProductActionWatcher,
    fetchAllModelActionWatcher,
    fetchProductSubcategoryActionWatcher,
    fetchAllProductSubcategoryActionWatcher,
} from './tickets';
import {
    createBusinessClientActionWatcher,
    updateBusinessClientActionWatcher,
    fetchBusinessClientActionWatcher,
    fetchBusinessClientByIdActionWatcher
} from "./businessclient"

export default function* rootSaga() {
    yield all([
        fetchEmployeesActionWatcher(),
        createEmployeesActionWatcher(),
        deleteEmployeesActionWatcher(),
        updateEmployeesActionWatcher(),
        fetchEmployeeByIdActionWatcher(),
        imageUploadActionWatcher(),
        fetchStateActionWatcher(),
        fetchCityActionWatcher(),
        fetchAllCityActionWatcher(),

        fetchTicketByIdActionWatcher(),
        fetchTicketsActionWatcher(),
        updateTicketsActionWatcher(),
        createTicketsActionWatcher(),
        deleteTicketsActionWatcher(),
        uploadTicketsActionWatcher(),
        fetchBrandActionWatcher(),
        fetchProductActionWatcher(),
        fetchModelActionWatcher(),
        createBulkTicketsActionWatcher(),
        fetchAllProductActionWatcher(),
        fetchAllModelActionWatcher(),
        fetchProductSubcategoryActionWatcher(),
        fetchAllProductSubcategoryActionWatcher(),

        createBusinessClientActionWatcher(),
        updateBusinessClientActionWatcher(),
        fetchBusinessClientActionWatcher(),
        fetchBusinessClientByIdActionWatcher()
    ]);
}