import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
  isLoadingUser: true,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        errors: null,
        isLoadingUser: false,
        isAuth: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        errors: null,
        isLoadingUser: false,
      };
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        errors: payload,
        isLoadingUser: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        isAuth: false,
        errors: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
