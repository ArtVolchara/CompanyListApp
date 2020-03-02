import { put, call, takeEvery } from 'redux-saga/effects';
import {
  IS_LOGGED_GOT_RESPONSE, IS_LOGGED_ERROR, FETCHED_IS_LOGGED, LOGIN_REQUEST, LOGIN_GOT_RESPONSE, LOGIN_ERROR,
  FETCHED_LOGIN, REGISTER_REQUEST, REGISTER_GOT_RESPONSE, REGISTER_ERROR, FETCHED_REGISTER, CLEAR_STATUS,
  IS_LOGGED_REQUEST, LOGOUT_REQUEST, LOGOUT_GOT_RESPONSE, LOGOUT_ERROR, FETCHED_LOGOUT,
  SETACTIVEPAGE, GETCOMPANIES_REQUEST, GETCOMPANIES_GOT_RESPONSE, GETCOMPANIES_ERROR, FETCHED_GETCOMPANIES,
  GETPRODUCTS_REQUEST, GETPRODUCTS_GOT_RESPONSE, GETPRODUCTS_ERROR, FETCHED_GETPRODUCTS, ADDPRODUCT,
} from '../types/types';

const companiesObject = require('../../components/CompanyList/company.json');
const tempProductsObject = require('../../components/ProductList/ products-AWXynW48hvnrhv3PBzCm.json');


// ///////////////////isLoggedChecking//////////////////////
export const isLoggedRequestAC = () => ({ type: IS_LOGGED_REQUEST });

export const isLoggedGotResponseAC = (result) => ({ type: IS_LOGGED_GOT_RESPONSE, isLoggedIn: result.isLoggedIn });

export const isLoggedErrorAC = (error) => ({ type: IS_LOGGED_ERROR, isLoggedError: error.message });

export function* isLoggedFetchAsyncAC() {
  try {
    yield put(isLoggedRequestAC());
    const response = yield fetch('/api/users/isLogged', { credentials: 'include' });
    const result = yield call(() => response.json());
    if (response.status === 200) {
      yield put(isLoggedGotResponseAC(result));
    } else {
      console.log(`server responded with status: ${result.status}(front/actions/isLoggedFetchAsyncAC).Result:`, result);
    }
  } catch (error) {
    yield put(isLoggedErrorAC(error));
  }
}

export const isLoggedFetchAC = () => ({ type: FETCHED_IS_LOGGED });

// //////////////////////LOGIN/////////////////////////////
export const loginRequestAC = () => ({ type: LOGIN_REQUEST });


export const loginGotResponseAC = (result) => ({ type: LOGIN_GOT_RESPONSE, isLoggedIn: result.isLoggedIn });

export const loginErrorAC = (err) => ({ type: LOGIN_ERROR, loginStatusError: err });


export function* loginFetchAsyncAC(action) {
  try {
    yield put(loginRequestAC());
    const response = yield call(() => fetch('/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: action.data.username,
        password: action.data.password,
      }),
    }));
    if (response.status === 200) {
      const result = yield call(() => response.json());
      yield put(loginGotResponseAC(result));
    } else if (response.status === 400) {
      const err = yield call(() => response.json());
      yield put(loginErrorAC(err));
    }
  } catch (error) {
    console.log(error);
  }
}

export const loginFetchAC = (data) => ({ type: FETCHED_LOGIN, data });

// ////////////////////REGISTRATION/////////////////////

export const registerRequestAC = () => ({ type: REGISTER_REQUEST });

export const registerGotResponseAC = (result) => ({ type: REGISTER_GOT_RESPONSE, registrationStatus: result.registrationStatus });

export const registerErrorAC = (err) => ({ type: REGISTER_ERROR, registrationStatusError: err });

export function* registerFetchAsyncAC(action) {
  try {
    yield put(registerRequestAC());
    const response = yield call(() => fetch('/api/users/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: action.data.username,
        password: action.data.password,
        email: action.data.email,
      }),
    }));
    if (response.status === 200) {
      const result = yield call(() => response.json());
      yield put(registerGotResponseAC(result));
    } else if (response.status === 400) {
      const err = yield call(() => response.json());
      yield put(registerErrorAC(err));
    }
  } catch (error) {
    console.log(error);
  }
}

export const registerFetchAC = (data) => ({ type: FETCHED_REGISTER, data });

// ////////////////////////LOGOUT/////////////////////////////
export const logoutRequestAC = () => ({ type: LOGOUT_REQUEST });

export const logoutGotResponseAC = (result) => ({ type: LOGOUT_GOT_RESPONSE, isLoggedIn: result.isLoggedIn });

export const logoutErrorAC = (error) => ({ type: LOGOUT_ERROR, logoutError: error.message });

export function* logoutFetchAsyncAC() {
  try {
    yield put(logoutRequestAC());
    const response = yield fetch('/api/users/logout', { credentials: 'include', method: 'DELETE' });
    const result = yield call(() => response.json());
    if (response.status === 200) {
      yield put(logoutGotResponseAC(result));
    } else {
      console.log(result);
    }
  } catch (error) {
    yield put(logoutErrorAC(error));
  }
}

export const logoutFetchAC = () => ({ type: FETCHED_LOGOUT });

// /////////////////////////SETACTIVEPAGE//////////////////////////

export const setActivePageAC = (activePage) => ({ type: SETACTIVEPAGE, activePage });

// ////////////////////////////GETCOMPANIES//////////////////////////
export const getCompaniesRequestAC = () => ({ type: GETCOMPANIES_REQUEST });


export const getCompaniesGotResponseAC = (result) => ({ type: GETCOMPANIES_GOT_RESPONSE, companies: result.companies, allCompaniesCount: result.allCompaniesCount, limit: result.limit });


export const getCompaniesErrorAC = (err) => ({ type: GETCOMPANIES_ERROR, getCompaniesError: err });


export function* getCompaniesFetchAsyncAC(action) {
  try {
    yield put(getCompaniesRequestAC());
    const limit = 20;
    const response = yield call(() => fetch(`/api/companies/_search?offset=${action.activePage - 1}`));
    if (response.status === 200) {
      const result = yield call(() => response.json());
      yield put(getCompaniesGotResponseAC(result));
    } else if (response.status === 404) {
      const allCompaniesCount = companiesObject.hits.hits.length;
      const companies = companiesObject.hits.hits.filter((el, i) =>
        i >= (action.activePage - 1) * limit && i <= (action.activePage - 1) * limit + limit - 1);
      const result = { companies, allCompaniesCount, limit };
      yield put(getCompaniesGotResponseAC(result));
    } else {
      const err = yield call(() => response.json());
      yield put(getCompaniesErrorAC(err));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const getCompaniesFetchAC = (activePage, allCompaniesCount) => ({
  type: FETCHED_GETCOMPANIES, activePage, allCompaniesCount,
});

// ////////////////////////////GETPRODUCTS//////////////////////////
export const getProductsRequestAC = () => ({ type: GETPRODUCTS_REQUEST });

export const getProductsGotResponseAC = (result) => ({ type: GETPRODUCTS_GOT_RESPONSE, products: result.products, company: result.company });

export const getProductsErrorAC = (err) => ({ type: GETPRODUCTS_ERROR, getProductsError: err });


export function* getProductsFetchAsyncAC(action) {
  try {
    yield put(getProductsRequestAC());
    let response = yield call(() => fetch(`/api/companies/${action._id}/products`));
    if (response.status === 200) {
      const result = yield call(() => response.json());
      yield put(getProductsGotResponseAC(result));
    } else if (response.status === 404) {
      const company = companiesObject.hits.hits.find((el) => el._id === action._id);
      if (company) {
        let result = { products: [], company };
        if (action._id === 'AWXynW48hvnrhv3PBzCm') {
          result = { products: tempProductsObject.products, company };
        }
        yield put(getProductsGotResponseAC(result));
      }
    } else {
      const err = yield call(() => response.json());
      yield put(getProductsErrorAC(err));
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const getProductsFetchAC = (_id) => ({
  type: FETCHED_GETPRODUCTS, _id,
});
// ///////////////////WatchFetches//////////////////////////

export function* watchFetches() {
  yield takeEvery(FETCHED_IS_LOGGED, isLoggedFetchAsyncAC);
  yield takeEvery(FETCHED_LOGIN, loginFetchAsyncAC);
  yield takeEvery(FETCHED_REGISTER, registerFetchAsyncAC);
  yield takeEvery(FETCHED_LOGOUT, logoutFetchAsyncAC);
  yield takeEvery(FETCHED_GETCOMPANIES, getCompaniesFetchAsyncAC);
  yield takeEvery(FETCHED_GETPRODUCTS, getProductsFetchAsyncAC);
}

// /////////////////clearStatusAC//////////////////////

export const clearStatusAC = () => ({ type: CLEAR_STATUS });

// /////////////////////////ADDPRODUCT//////////////////////////

export function addProductAC(product) { 
  console.log(product);
  return { type: ADDPRODUCT, product: product }}
