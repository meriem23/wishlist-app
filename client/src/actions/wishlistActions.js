import axios from "axios";
import { GET_WISHLISTS } from "./types";
import setToken from "../setToken";

/* Get all wishlists*/
export const getWishlists = () => (dispatch) => {
  setToken();
  axios.get(`${process.env.REACT_APP_API_URL}wishlist`).then((res) => {
    dispatch({
      type: GET_WISHLISTS,
      payload: res.data,
    });
  });
};

/* Add a new wishlist */
export const addWishlist = (newWish) => (dispatch) => {
  setToken();
  axios
    .post(`${process.env.REACT_APP_API_URL}wishlist`, newWish)
    .then((res) => dispatch(getWishlists()))
    .catch((err) => {
      alert("Error adding new wishlist");
    });
};
