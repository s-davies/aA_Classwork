import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from "../actions/session_actions";

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = Object.assign([], state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      newState = action.errors;
      return newState;
    case RECEIVE_CURRENT_USER:
      newState = [];
      return newState;
    default:
      return state;
  }
};

export default sessionErrorsReducer;