import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT } from "../actions/types";
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
      return { ...state, products: [payload, ...state.products], errors: null };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((el) => el.i_d !== payload),
        errors: null,
      };
    default:
      return state;
  }
};
export default productReducer;
