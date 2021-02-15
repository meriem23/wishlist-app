import { GET_PRODUCTS, ADD_PRODUCT } from "../actions/types";
let initState = {
  products: [],
  errors: null,
  saved: null,
};

const productReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        errors: null,
      };
    case ADD_PRODUCT:
      return { ...state, products: [payload, ...state.products] };
    default:
      return state;
  }
};
export default productReducer;
