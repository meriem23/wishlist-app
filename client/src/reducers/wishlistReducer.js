import {
  DELETE_WISHLIST,
  EDIT_WISHLIST,
  GET_WISHLISTS,
} from "../actions/types";
let initState = {
  wishlists: [],
  errors: null,
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
    case EDIT_WISHLIST:
      return {
        ...state,
        wishlists: state.wishlists.map((el) =>
          el._id === payload._id ? payload : el
        ),
      };
    default:
      return state;
  }
};
export default wishlistReducer;
