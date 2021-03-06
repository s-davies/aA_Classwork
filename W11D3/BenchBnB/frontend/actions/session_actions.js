export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_SESSION_ERRORS";
import * as ApiUtils from '../util/session_api_util';

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const signup = (user) => dispatch => {
  return ApiUtils.signup(user)
    .then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));
};

export const login = (user) => dispatch => {
  return ApiUtils.login(user)
    .then(user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveErrors(err.responseJSON)));
};

export const logout = () => dispatch => {
  return ApiUtils.logout()
    .then(() => dispatch(logoutCurrentUser()), err => dispatch(receiveErrors(err.responseJSON)));
};