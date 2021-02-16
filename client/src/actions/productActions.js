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
export const addProduct = (newProduct) => (dispatch) => {
  setToken();
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  axios.post("http://localhost:5000/api/product", newProduct).then((res) =>
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    })
  );
};
