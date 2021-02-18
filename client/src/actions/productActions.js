import axios from "axios";
import { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCTS } from "./types";
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
export const addProduct = (newProduct) => (dispatch) => {
  setToken();
  let config = {
    "Content-Type": "form-data",
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}product`, newProduct, config)
    .then((res) => dispatch(getProducts()))
    .catch((err) => {
      alert("Error adding new product");
    });
};
/* Delete a product */
export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}product/${id}`);
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
  dispatch(getProducts());
};
