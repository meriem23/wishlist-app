import axios from "axios";
import { DELETE_WISHLIST, EDIT_WISHLIST, GET_WISHLISTS } from "./types";
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

/* Delete a wishlist */
export const deleteWishlist = (id) => async (dispatch) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}wishlist/${id}`);
  dispatch({
    type: DELETE_WISHLIST,
    payload: id,
  });
  dispatch(getWishlists());
};

/* Edit a product */
export const editWishlist = (updateWish) => async (dispatch) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}wishlist/${updateWish._id}`,
    updateWish
  );
  await dispatch({
    type: EDIT_WISHLIST,
    payload: res.data,
  });
  dispatch(getWishlists());
};
