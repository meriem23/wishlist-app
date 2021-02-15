import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
} from "./types";
import setToken from "../setToken";

/* Get all products*/
export const getProducts = () => (dispatch) => {
  setToken();
  axios.get(`${process.env.REACT_APP_API_URL}product`).then((res) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  });
};

/* Add a new product */
export const addProduct = (newProduct) => async (dispatch) => {
  setToken();
  const config = {
    "Content-Type": "form-data",
  };
  await axios.post(
    `${process.env.REACT_APP_API_URL}product`,
    newProduct,
    config
  );
  dispatch({
    type: ADD_PRODUCT,
  });
  dispatch(getProducts());
};
