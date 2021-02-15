import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setToken from "../setToken";

export const registerUser = (user) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/register", user)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("http://localhost:5000/api/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      // dispatch({
      //   type: LOAD_USER_FAIL,
      //   payload: err.response.data.msg,
      // })
      alert("ERROR GET USERS")
    );
};

export const loginUser = (data) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    );
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
