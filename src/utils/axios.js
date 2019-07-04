import axios from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
    baseURI: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        AccessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
        "x-oc-client-id": window.OC_CLIENT_ID
    }
});

/**
 * Request interceptor
 * Add Authorization header if it exists
 * This configuration applies for all requests
 */
instance.interceptors.request.use(
    reqConfig => {
        return reqConfig;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * Catch basic errors like 401 and redirect to login
 * This configuration applies for all responses
 */
instance.interceptors.response.use(
    response => response,
    error => {
        // Do something with response error
        if (!error) {
            // request cancelled
            // when backend server is not available at all
        } else if (!error.response) {
            // when request is timeout
        } else if (error.response.status === 401) {
            // apply refresh token logic here instead of redirecting to login
            localStorage.clear();
        }
        return Promise.reject(error.response);
    }
);

export default instance;
