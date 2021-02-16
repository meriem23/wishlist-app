import { DELETE_WISHLISTS, GET_WISHLISTS } from "../actions/types";
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
    case DELETE_WISHLISTS:
      return {
        ...state,
        wishlists: state.wishlists.filter((el) => el.i_d !== payload),
      };
    default:
      return state;
  }
};
export default wishlistReducer;
