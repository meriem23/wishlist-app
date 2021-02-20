import axios from "axios";
import { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT } from "./types";
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
export const addProduct = (info) => (dispatch) => {
  setToken();
  let formData = new FormData();
  Object.keys(info).map((el) => formData.append(el, info[el]));
  axios
    .post(`${process.env.REACT_APP_API_URL}product`, formData)
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
/* Edit a product */
export const editProduct = (info) => async (dispatch) => {
  let formData = new FormData();
  Object.keys(info).map((el) => formData.append(el, info[el]));
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}product/${info._id}`,
    formData
  );
  await dispatch({
    type: EDIT_PRODUCT,
    payload: res.data,
  });
  dispatch(getProducts());
};
