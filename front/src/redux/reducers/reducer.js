import { IS_LOGGED_GOT_RESPONSE, IS_LOGGED_ERROR, LOGIN_REQUEST, LOGIN_GOT_RESPONSE, LOGIN_ERROR, REGISTER_REQUEST, REGISTER_GOT_RESPONSE, REGISTER_ERROR, CLEAR_STATUS, IS_LOGGED_REQUEST, LOGOUT_REQUEST, LOGOUT_GOT_RESPONSE, LOGOUT_ERROR} from '../types/types'

const initialState = {
    isLoggedIn: false,
    isLoggedLoadingFetch: false,
    isLoggedError: '',
    loginLoadingFetch: false,
    loginStatusError: '',
    registrationStatusError: '',
    registrationStatus: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_LOGGED_REQUEST: {
            return {
                ...state,
                isLoggedLoadingFetch: true,
                isLoggedError: '',
            };
        }
        case IS_LOGGED_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                isLoggedLoadingFetch: false,
                isLoggedError: '',
            };
        }
        case IS_LOGGED_ERROR: {
            return {
                ...state,
                isLoggedLoadingFetch: false,
                isLoggedError: action.isLoggedError,
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                loginLoadingFetch: true,
                loginStatusError: '',
            };
        }
        case LOGIN_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                loginLoadingFetch: false,
                loginStatusError: '',
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginLoadingFetch: false,
                loginStatusError: action.loginStatusError,
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                registrationLoadingFetch: true,
                registrationStatusError: '',
            };
        }
        case REGISTER_GOT_RESPONSE: {
            return {
                ...state,
                registrationLoadingFetch: false,
                registrationStatus: action.registrationStatus,
                registrationStatusError: '',
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                registrationLoadingFetch: false,
                registrationStatusError: action.registrationStatusError,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutLoadingFetch: true,
                logRegstatusError: '',
            };
        }
        case LOGOUT_GOT_RESPONSE: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                logoutLoadingFetch: false,
                logRegstatusError: '',
            };
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutLoadingFetch: false,
                logoutError: action.logoutError,
            }
        }
        case CLEAR_STATUS: {
            return {
                ...state,
                registrationLoadingFetch: false,
                registrationStatusError: '',
                registrationStatus: '',
            }
        }
        default:
            return state;
    }
}
