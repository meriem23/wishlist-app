import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
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
      alert("ERROR GET PRODUCTS");
    });
};

/* Add a new product */
export const addProduct = (newProduct) => async (dispatch) => {
  const msg = await axios.post(
    `${process.env.REACT_APP_API_URL}product/newProduct`,
    newProduct
  );
  dispatch({
    type: ADD_PRODUCT,
    payload: msg,
  });
  dispatch(getProducts());
};
