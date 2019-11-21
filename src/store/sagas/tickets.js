// commenting the code

import { call, put, takeLatest } from "redux-saga/effects";

import {
    FETCH_TICKETS_WATCHER,
    FETCH_TICKETS_BY_ID_WATCHER,
    CREATE_TICKETS_WATCHER,
    DELETE_TICKETS_WATCHER,
    UPDATE_TICKETS_WATCHER,
    UPLOAD_TICKETS_WATCHER,
    FETCH_BRAND_WATCHER,
    FETCH_PRODUCT_BY_BRAND_ID_WATCHER,
    FETCH_MODEL_BY_PRODUCT_ID_WATCHER,
    CREATE_BULK_TICKETS_WATCHER,
    FETCH_ALL_PRODUCT_WATCHER,
    FETCH_ALL_MODEL_WATCHER,
    FETCH_PRODUCT_SUBCATEGORY_BY_BRAND_ID_AND_PRODUCTID_WATCHER,
    FETCH_ALL_PRODUCTSUB_CATEGORY_WATCHER

} from "../actionTypes";
import {
    setTickets,
    setTicketsError,
    setTicket,
    setPageLoaderStart,
    setPageLoaderFinish,
    setBrand,
    setBrandError,
    setProductError,
    setProduct,
    setModel,
    setModelError,
    showToastMessage,
    setProductSubcategory,
    setProductSubcategoryError,
} from "../actions";
import axios from "../../utils/axios";
import { BASE_URL, BASE_URL_TICKETS, BASE_URL_COMPLAINTS, BASE_URL_PRODUCTS } from "../../utils/config";


function fetchTicketsApi(payload) {
    let url = `${BASE_URL_COMPLAINTS}tickets/ticket/getAllTickets/`;

    if (payload && payload.isFilter) {
        url = `${url}${payload.name}/${payload.value}`;
    }
    url = `${url}/?page=${Number(payload ? payload.page : 0)}&size=${Number(payload ? payload.rowsPerPage : 10)}`;

    if (payload && payload.sortField) {
        url = `${url}&sort=${payload.sortField},${payload.sortOrder.toUpperCase()}`
    }

    return axios.request({
        method: "get",
        url: url,
    });
}

function* fetchTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchTicketsApi, payload);
        yield put(setTickets(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setTicketsError(e));
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* fetchTicketsActionWatcher() {
    yield takeLatest(FETCH_TICKETS_WATCHER, fetchTicketsActionEffect);
}

//Brand Api
function fetchBrandsApi() {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}products/make/findall`
    });
}

function* fetchBrandActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let brandDdata = yield call(fetchBrandsApi);
        yield put(setBrand(brandDdata.data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setBrandError(e));
        if (reject) reject(e);
    }
}

export function* fetchBrandActionWatcher() {
    yield takeLatest(FETCH_BRAND_WATCHER, fetchBrandActionEffect);
}
//** Fetch All Products  API call*/
function fetchProductsApi() {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}products/category/findall`,
    });
}
function* fetchAllProductActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let productData = yield call(fetchProductsApi);
        yield put(setProduct(productData.data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setProductError(e));
        if (reject) reject(e);
    }
}
export function* fetchAllProductActionWatcher() {
    yield takeLatest(FETCH_ALL_PRODUCT_WATCHER, fetchAllProductActionEffect);
}

//** Fetch All Models  API call*/
function fetchAllModelsApi() {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}products/model/findAll`,

    });
}
function* fetchAllModelActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let modelData = yield call(fetchAllModelsApi);
        yield put(setModel(modelData.data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setModelError(e));
        if (reject) reject(e);
    }
}
export function* fetchAllModelActionWatcher() {
    yield takeLatest(FETCH_ALL_MODEL_WATCHER, fetchAllModelActionEffect);
}
// **-----------  END----------*/
// FETCH PRODUCT BY BRAND ID
// old service code commented
function fetchProductByBrandIdApi(payload) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_TICKETS}Employee/brands/${payload.BrandKey}/products`,
    });
}

function* fetchProductActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let { data } = yield call(fetchProductByBrandIdApi, payload);
        yield put(setProduct(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setProductError(e));
        if (reject) reject(e);
    }
}

export function* fetchProductActionWatcher() {
    yield takeLatest(FETCH_PRODUCT_BY_BRAND_ID_WATCHER, fetchProductActionEffect);
}

//**FETCH MODEL BY PRODUCT AND BRAND ID */
function fetchModelsApi(payload) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}/products/model/find?makeId=${payload.makeId}&categoryId=${payload.categoryId}&subCategoryId=${payload.subCategoryId}`,
    });
}

function* fetchModelActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let { data } = yield call(fetchModelsApi, payload);
        yield put(setModel(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setModelError(e));
        if (reject) reject(e);
    }
}

export function* fetchModelActionWatcher() {
    yield takeLatest(FETCH_MODEL_BY_PRODUCT_ID_WATCHER, fetchModelActionEffect);
}

//**------------*/
//** FETCH PRODUCT SUBCATEGORY BY BRAND_ID_ AND PRODUCTID_WATCHER */
function fetchProductSubcategoryApi(payload) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}/products/subcategory/find?makeId=${payload.makeId}&categoryId=${payload.categoryId}`,
    });
}
function* fetchProductSubcategoryActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let { data } = yield call(fetchProductSubcategoryApi, payload)
        yield put(setProductSubcategory(data))
        if (resolve) resolve()
    } catch (e) {
        yield put(setProductSubcategoryError(e))
        if (reject) reject(e);
    }
}
export function* fetchProductSubcategoryActionWatcher() {
    yield takeLatest(FETCH_PRODUCT_SUBCATEGORY_BY_BRAND_ID_AND_PRODUCTID_WATCHER, fetchProductSubcategoryActionEffect)
}
// **End */
// old service code **/
// **FETCH_ALL_PRODUCTSUB_CATEGORY_WATCHER */
function fetchAllProductSubcategoryApi(payload) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_PRODUCTS}products/subcategory/findAll`,
    });
}
function* fetchAllProductSubcategoryActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        let { data } = yield call(fetchAllProductSubcategoryApi, payload)
        yield put(setProductSubcategory(data))
        if (resolve) resolve()
    } catch (e) {
        yield put(setProductSubcategoryError(e))
        if (reject) reject(e);
    }
}
export function* fetchAllProductSubcategoryActionWatcher() {
    yield takeLatest(FETCH_ALL_PRODUCTSUB_CATEGORY_WATCHER, fetchAllProductSubcategoryActionEffect)
}
//**End */
function fetchTicketByIdApi(data) {
    return axios.request({
        method: "get",
        url: `${BASE_URL_COMPLAINTS}tickets/ticket/getByTicketId?ticketId=${data.ticketId}`,
        data
    });
}

function* fetchTicketByIdActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        let { data } = yield call(fetchTicketByIdApi, payload);
        yield put(setPageLoaderFinish());
        yield put(setTicket(data));
        if (resolve) resolve();
    } catch (e) {
        yield put(setTicketsError(e));
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* fetchTicketByIdActionWatcher() {
    yield takeLatest(FETCH_TICKETS_BY_ID_WATCHER, fetchTicketByIdActionEffect);
}


function createTicketsApi(data) {
    return axios.request({
        method: "post",
        url: `${BASE_URL_COMPLAINTS}tickets/ticket/add`,
        data
    });
}

function* createTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(createTicketsApi, payload);
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Ticket created successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* createTicketsActionWatcher() {
    yield takeLatest(CREATE_TICKETS_WATCHER, createTicketsActionEffect);
}
//**create Bulk ticket */
function createBulkTicketsApi(data) {
    return axios.request({
        method: "post",
        url: `${BASE_URL_COMPLAINTS}tickets/ticket/readFromExcel`,
        data
    });
}
function* createBulkTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;
    try {
        yield put(setPageLoaderStart());
        yield call(createBulkTicketsApi, payload);
        if (resolve) resolve();
        yield call(fetchTicketsActionEffect, "")
        yield put(showToastMessage({ message: 'Tickets created successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* createBulkTicketsActionWatcher() {
    yield takeLatest(CREATE_BULK_TICKETS_WATCHER, createBulkTicketsActionEffect);
}
//**End */


function updateTicketsApi(data) {

    return axios.request({
        method: "put",
        url: `${BASE_URL_COMPLAINTS}tickets/ticket/updateBasedOnTicketId?ticketId=${data.ticketId}`,
        data
    });
}

function* updateTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(updateTicketsApi, payload);
        if (resolve) resolve();
        yield put(showToastMessage({ message: 'Ticket updated successfully', type: 'success' }));
    } catch (e) {
        if (reject) reject(e);
        yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* updateTicketsActionWatcher() {
    yield takeLatest(UPDATE_TICKETS_WATCHER, updateTicketsActionEffect);
}


function deleteTicketsApi(data) {
    return axios.request({
        method: "delete",
        url: `${BASE_URL}tickets/${data.id}`,
        data
    });
}

function* deleteTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(deleteTicketsApi, payload);
        if (resolve) resolve();
    } catch (e) {
        if (reject) reject(e);
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* deleteTicketsActionWatcher() {
    yield takeLatest(DELETE_TICKETS_WATCHER, deleteTicketsActionEffect);
}


function uploadTicketsApi(data) {
    return axios.request({
        method: "post",
        url: `${BASE_URL_COMPLAINTS}tickets/ticket/readFromExcel`,
        data
    });
}

function* uploadTicketsActionEffect(action) {
    let { payload, resolve, reject } = action;

    try {
        yield put(setPageLoaderStart());
        yield call(uploadTicketsApi, payload);
        if (resolve) resolve();
    } catch (e) {
        if (reject) reject(e);
    } finally {
        yield put(setPageLoaderFinish());
    }
}

export function* uploadTicketsActionWatcher() {
    yield takeLatest(UPLOAD_TICKETS_WATCHER, uploadTicketsActionEffect);
}

