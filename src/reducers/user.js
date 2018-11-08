import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCH_USER } from "../constant/auth";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || null;
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}