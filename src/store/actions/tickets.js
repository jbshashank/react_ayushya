import {
  FETCH_TICKETS_WATCHER,
  FETCH_TICKETS_BY_ID_WATCHER,
  DELETE_TICKETS_WATCHER,
  UPDATE_TICKETS_WATCHER,
  CREATE_TICKETS_WATCHER,
  UPLOAD_TICKETS_WATCHER,
  FETCH_BRAND_WATCHER,
  SET_BRAND,
  SET_BRAND_ERROR,

  FETCH_PRODUCT_BY_BRAND_ID_WATCHER,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,

  FETCH_MODEL_BY_PRODUCT_ID_WATCHER,
  SET_MODEL,
  SET_MODEL_ERROR,

  SET_TICKETS,
  SET_TICKET,
  SET_TICKETS_ERROR,
  RESET_TICKETS_PAGINATION,

  CREATE_BULK_TICKETS_WATCHER,
  FETCH_ALL_PRODUCT_WATCHER,
  FETCH_ALL_MODEL_WATCHER,

  SET_PRODUCT_SUBCATEGORY_ERROR,
  SET_PRODUCT_SUBCATEGORY,
  FETCH_PRODUCT_SUBCATEGORY_BY_BRAND_ID_AND_PRODUCTID_WATCHER,
  FETCH_ALL_PRODUCTSUB_CATEGORY_WATCHER
} from "../actionTypes";

export const fetchTicketsWatcher = (payload, resolve, reject) => {
  return { type: FETCH_TICKETS_WATCHER, payload, resolve, reject }
};

export const fetchBrandWatcher = (payload, resolve, reject) => {
  return { type: FETCH_BRAND_WATCHER, payload, resolve, reject }
};

export const fetchTicketsByIdWatcher = (payload, resolve, reject) => {
  return { type: FETCH_TICKETS_BY_ID_WATCHER, payload, resolve, reject }
};

export const setTickets = (payload) => {
  return { type: SET_TICKETS, payload }
};
export const setBrand = (payload) => {
  return { type: SET_BRAND, payload }
};

export const setBrandError = (payload) => {
  return { type: SET_BRAND_ERROR, payload }
};
// //**Product fetch actions.... */
export const fetchProductByBrandIdWatcher = (payload) => {
  console.log("value of palyload...", payload)
  return { type: FETCH_PRODUCT_BY_BRAND_ID_WATCHER, payload }
}
export const setProduct = (payload) => {
  return { type: SET_PRODUCT, payload }
};
export const setProductError = (payload) => {
  return { type: SET_PRODUCT_ERROR, payload }
};

//** ProductSubcategory fetch action*/
export const fetchProductSubcategoryByBrandIdAndProductIdWatcher = (payload) => {
  return { type: FETCH_PRODUCT_SUBCATEGORY_BY_BRAND_ID_AND_PRODUCTID_WATCHER, payload }
}
export const setProductSubcategory = (payload) => {
  return { type: SET_PRODUCT_SUBCATEGORY, payload }
};
export const setProductSubcategoryError = (payload) => {
  return { type: SET_PRODUCT_SUBCATEGORY_ERROR, payload }
};
//**End------ */
//**Modele fetch Actions.... */

export const fetchModeByProductIdWatcher = (payload) => {
  return { type: FETCH_MODEL_BY_PRODUCT_ID_WATCHER, payload }
}
export const setModel = (payload) => {
  return { type: SET_MODEL, payload }
};
export const setModelError = (payload) => {
  return { type: SET_MODEL_ERROR, payload }
};
//-----------------------------------------------

//** Fetch All Product Watcher() */

export const fetchAllProductWatcher = (payload, resolve, reject) => {
  return { type: FETCH_ALL_PRODUCT_WATCHER, payload, resolve, reject }
};
//**fetchAllProductSubCategoryWatcher */
export const fetchAllProductSubCategoryWatcher = (payload, resolve, reject) => {
  return { type: FETCH_ALL_PRODUCTSUB_CATEGORY_WATCHER, payload, resolve, reject }
};
// //**End */
//** Fetch All Models Watcher() */
export const fetchAllModelWatcher = (payload, resolve, reject) => {
  return { type: FETCH_ALL_MODEL_WATCHER, payload, resolve, reject }
}
export const setTicket = (payload) => {
  return { type: SET_TICKET, payload }
};

export const resetTicketsPagination = (payload) => {
  return { type: RESET_TICKETS_PAGINATION, payload }
};

export const setTicketsError = (payload) => {
  return { type: SET_TICKETS_ERROR, payload }
};

export const createTicketsWatcher = (payload, resolve, reject) => {
  return { type: CREATE_TICKETS_WATCHER, payload, resolve, reject }
};

export const createBulkTicketsWatcher = (payload, resolve, reject) => {
  return { type: CREATE_BULK_TICKETS_WATCHER, payload, resolve, reject }
};

export const updateTicketsWatcher = (payload, resolve, reject) => {
  return { type: UPDATE_TICKETS_WATCHER, payload, resolve, reject }
};

export const deleteTicketsWatcher = (payload, resolve, reject) => {
  return { type: DELETE_TICKETS_WATCHER, payload, resolve, reject }
};

export const uploadTicketsWatcher = (payload, resolve, reject) => {
  return { type: UPLOAD_TICKETS_WATCHER, payload, resolve, reject }
};

// import { craeteAction } from "redux-actions";

//action type
//request REQUEST_*
//receive RECEIVE_*


/** brand action */
// import { FETCH_BRAND, FETCH_SUCCEEDED, FETCH_FAILED } from '../actionTypes';

// export const fetchBrandAction = () => ({ type: FETCH_BRAND });
// export const fetchSuccessBrandAction = (receivedBrand) => ({ type: FETCH_SUCCEEDED, receivedBrand });
// export const fetchFailedBrandAction = (error) => ({ type: FETCH_FAILED, error });