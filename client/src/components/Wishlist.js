import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists } from "../actions/wishlistActions";
import WishlistCard from "./WishlistCard";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
  }, []);
  const { wishlists } = useSelector((state) => state.wish);
  return (
    <div>
      {wishlists.map((wishlist) => (
        <WishlistCard wishlist={wishlist} />
      ))}
    </div>
  );
};

export default ProductList;
