import {
    PAGE_LOADER_START, 
    PAGE_LOADER_FINISH,
    HIDE_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE
} from "../actionTypes";

const INITIAL_STATE = {
    toast: {
        open: false,
        message: '',
        type: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        }
    },
    pageLoaderCount: 0
}

const pageLoader = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_TOAST_MESSAGE:
                const anchorOrigin = action.payload.anchorOrigin || INITIAL_STATE.toast.anchorOrigin
            return {
                ...state,
                toast: {
                    open: true,
                    message: action.payload.message,
                    type: action.payload.type,
                    anchorOrigin
                }
            }
        case HIDE_TOAST_MESSAGE:
            return {
                ...state,
                toast: INITIAL_STATE.toast
            }
        case PAGE_LOADER_START:
            return {
                ...state,
                pageLoaderCount: state.pageLoaderCount + 1
            };
        case PAGE_LOADER_FINISH:
            return {
                ...state,
                pageLoaderCount: state.pageLoaderCount - 1
            };
        default:
            return state;
    }
};

export default pageLoader;
