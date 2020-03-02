import {
  IS_LOGGED_REQUEST, LOGOUT_REQUEST, LOGOUT_GOT_RESPONSE, LOGOUT_ERROR,
  IS_LOGGED_GOT_RESPONSE, IS_LOGGED_ERROR, LOGIN_REQUEST, LOGIN_GOT_RESPONSE, LOGIN_ERROR,
  REGISTER_REQUEST, REGISTER_GOT_RESPONSE, REGISTER_ERROR, CLEAR_STATUS,
  SETACTIVEPAGE, GETCOMPANIES_REQUEST, GETCOMPANIES_GOT_RESPONSE, GETCOMPANIES_ERROR,
  GETPRODUCTS_REQUEST, GETPRODUCTS_GOT_RESPONSE, GETPRODUCTS_ERROR, ADDPRODUCT,
}
  from '../types/types';

const initialState = {
  isLoggedIn: false,
  isLoggedLoadingFetch: false,
  isLoggedError: '',
  loginLoadingFetch: false,
  loginStatusError: '',
  registrationStatusError: '',
  registrationStatus: '',
  limit: 0,
  activePage: 1,
  companies: [],
  getCompaniesError: '',
  allCompaniesCount: 0,
  getCompaniesLoadingFetch: false,
  getProductsLoadingFetch: false,
  products: [],
  company: {},
  getProductsError: '',
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
      };
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
      };
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
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutLoadingFetch: true,
        logoutError: '',
      };
    }
    case LOGOUT_GOT_RESPONSE: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        logoutLoadingFetch: false,
        logoutError: '',
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutLoadingFetch: false,
        logoutError: action.logoutError,
      };
    }
    case CLEAR_STATUS: {
      return {
        ...state,
        registrationLoadingFetch: false,
        registrationStatusError: '',
        registrationStatus: '',
      };
    }
    case SETACTIVEPAGE: {
      return {
        ...state,
        activePage: action.activePage,
      };
    }
    case GETCOMPANIES_REQUEST: {
      return {
        ...state,
        getCompaniesLoadingFetch: true,
      };
    }
    case GETCOMPANIES_GOT_RESPONSE: {
      return {
        ...state,
        companies: action.companies,
        getCompaniesError: '',
        allCompaniesCount: action.allCompaniesCount,
        getCompaniesLoadingFetch: false,
        limit: action.limit
      };
    }
    case GETCOMPANIES_ERROR: {
      return {
        ...state,
        getCompaniesError: action.getCompaniesError,
        getCompaniesLoadingFetch: false,
        companies: [],
      };
    }
    case GETPRODUCTS_REQUEST: {
      return {
        ...state,
        getProductsLoadingFetch: true,
      };
    }
    case GETPRODUCTS_GOT_RESPONSE: {
      return {
        ...state,
        getProductsLoadingFetch: false,
        company: action.company,
        products: action.products,
        getProductsError: '',
      };
    }
    case GETPRODUCTS_ERROR: {
      return {
        ...state,
        getProductssError: action.getProductssError,
        getProductsLoadingFetch: false,
        products: [],
      };
    }
    case ADDPRODUCT: {
      console.log(action.product); 
      return {
        ...state,
        products: state.products.concat(action.product),
      };
    }
    default:
      return state;
  }
}
