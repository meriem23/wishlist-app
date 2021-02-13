import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        errors: null,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: true,
        errors: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
