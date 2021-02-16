import { GET_WISHLISTS } from "../actions/types";
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
    default:
      return state;
  }
};
export default wishlistReducer;
