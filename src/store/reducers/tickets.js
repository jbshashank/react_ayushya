import {
    SET_TICKETS_ERROR,
    SET_TICKETS,
    SET_TICKET,
    SET_BRAND,
    SET_BRAND_ERROR,
    RESET_TICKETS_PAGINATION,
    SET_PRODUCT,
    SET_PRODUCT_ERROR,
    SET_MODEL,
    SET_MODEL_ERROR,
    SET_PRODUCT_SUBCATEGORY,
    SET_PRODUCT_SUBCATEGORY_ERROR
} from "../actionTypes";

const INITIAL_STATE = {
    tickets: null,
    ticket: null,
    error: null,
    brand: [],
    brandError: null,
    product:[],
    productError:null,
    models:[],
    modelsError:null,
    productSubcategory:[],
    productSubcategoryError:null
};

const tickets = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TICKETS:
            const existTickets = state.tickets && state.tickets.content ? state.tickets.content : {};
            return {
                ...state,
                tickets: {
                    ...action.payload,
                    content: {
                        ...existTickets,
                        [action.payload.number]: action.payload.content
                    }
                }
            };
        case  RESET_TICKETS_PAGINATION:
            return {
                ...state,
                tickets: null
            };
        case SET_TICKETS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_TICKET:
            return {
                ...state,
                ticket: action.payload
            };
        case SET_BRAND_ERROR:
            return {
                ...state,
                brandError: action.payload
            };
        case SET_BRAND:
            return {
                ...state,
                brand: action.payload
            };
        case SET_PRODUCT_ERROR:
            return {
                ...state,
                productError: action.payload
            };
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case SET_MODEL_ERROR:
            return {
                ...state,
                modelsError: action.payload
            };
        case SET_MODEL:
            return {
                ...state,
                models: action.payload
            };
        case SET_PRODUCT_SUBCATEGORY:
            return{
                ...state,
                productSubcategory:action.payload
            };
        case SET_PRODUCT_SUBCATEGORY:
            return{
                ...state,
                productSubcategoryError:action.payload
            };
        default:
            return state
    }
};
export default tickets;