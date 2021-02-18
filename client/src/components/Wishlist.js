import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists } from "../actions/wishlistActions";
import { getProducts } from "../actions/productActions";
import WishlistCard from "./WishlistCard";

const ProductList = ({ content, type }) => {
  const { wishlists } = useSelector((state) => state.wish);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  console.log(content);
  useEffect(() => {
    dispatch(getWishlists());
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {/* {wishlists.map((wishlist) => (
        <WishlistCard wishlist={wishlist} products={products} />
      ))} */}
      <p>{content.wishlist}</p>
    </div>
  );
};

export default ProductList;
