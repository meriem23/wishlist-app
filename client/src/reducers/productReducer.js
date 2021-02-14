import { GET_PRODUCTS } from "../actions/types";
let initState = {
  products: [],
  errors: null,
};

const productReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        errors: null,
      };
    default:
      return state;
  }
};
export default productReducer;
