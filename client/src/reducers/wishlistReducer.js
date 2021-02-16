import { DELETE_WISHLIST, GET_WISHLISTS } from "../actions/types";
let initState = {
  wishlists: [],
  errors: null,
  saved: null,
};

const wishlistReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_WISHLISTS:
      return {
        ...state,
        wishlists: payload,
        errors: null,
      };
    case DELETE_WISHLIST:
      return {
        ...state,
        wishlists: state.wishlists.filter((el) => el.i_d !== payload),
        errors: null,
      };
    default:
      return state;
  }
};
export default wishlistReducer;
