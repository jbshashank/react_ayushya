import {
    PAGE_LOADER_START,
    PAGE_LOADER_FINISH,
    SHOW_TOAST_MESSAGE,
    HIDE_TOAST_MESSAGE
} from "../actionTypes";
import { action } from "./common";

export function setPageLoaderStart() {
    return {type: PAGE_LOADER_START};
}

export function setPageLoaderFinish() {
    return {type: PAGE_LOADER_FINISH};
}

export const showToastMessage = payload => action(SHOW_TOAST_MESSAGE, { payload });

export const hideToastMessage = payload => action(HIDE_TOAST_MESSAGE, { payload });