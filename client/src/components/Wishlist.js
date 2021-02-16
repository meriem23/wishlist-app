import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlists } from "../actions/wishlistActions";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
  }, []);
  const { wishlists } = useSelector((state) => state.wish);
  return (
    <div>
      {wishlists.map((wish, i) => (
        <p key={i}>{wish.wishlist}</p>
      ))}
    </div>
  );
};

export default ProductList;
