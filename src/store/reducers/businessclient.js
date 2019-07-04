import {
    SET_BUSINESSCLIENT_LIST,
    SET_BUSINESSCLIENT_LIST_ERROR,
    SET_BUSINESSCLIENT,
    SET_BUSINESSCLIENT_ERROR,
    SET_ClEAR

} from "../actionTypes";

const INITIAL_STATE = {
    businessClientList:[],
    businessClientListError:null,
    businessClient:[],
    businessClientError:null

};

const businessclients = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        // case SET_MODEL:
        //     return {
        //         ...state,
        //         models: action.payload
        //     };
        case SET_BUSINESSCLIENT_LIST:
            return {
                ...state,
                businessClientList: action.payload
            };
            case SET_ClEAR:
            return {
                ...state,
                businessClient: []
            };

        case SET_BUSINESSCLIENT_LIST_ERROR:
            return {
                ...state,
                businessClientListError: action.payload
            };
         case SET_BUSINESSCLIENT:        
            return {
                 ...state,
                 businessClient: action.payload
            };
    
        case SET_BUSINESSCLIENT_ERROR:
            return {
                ...state,
                businessClientError: action.payload
            };
        default:
            return state
    }
};
export default businessclients;