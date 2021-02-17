import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
import ProductAdd from "./ProductAdd";
import WishlistModal from "./WishlistModal";
import { Menu, Button, List } from "antd";

const Drawer = ({ type, setContent }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wish);
  useEffect(() => {
    if (type === "products") {
      dispatch(getProducts());
    } else if (type === "wishlist") {
      dispatch(getWishlists());
    }
  }, []);

  return (
    <div>
      <Menu>
        <Button type="ghost">
          {type === "products" ? <ProductAdd /> : <WishlistModal />}
        </Button>
        {type === "products"
          ? products &&
            products.map((el) => (
              <List.Item onClick={() => setContent(el)}>{el.Name}</List.Item>
            ))
          : type === "wishlist"
          ? wishlists &&
            wishlists.map((el) => (
              <List.Item onClick={() => setContent(el)}>
                {el.wishlist}
              </List.Item>
            ))
          : null}
      </Menu>
    </div>
  );
};

export default Drawer;
