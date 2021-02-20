import ActionButton from "antd/lib/modal/ActionButton";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from "../actions/types";
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
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((el) =>
          el._id === payload._id ? payload : el
        ),
      };
    default:
      return state;
  }
};
export default productReducer;
