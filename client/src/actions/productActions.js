import axios from "axios";
import {
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
  LOAD_PRODUCTS_FAIL,
} from "./types";

/* Get all products*/

export const getProducts = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}product`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      alert("ERROR GET USERS");
    });
};
