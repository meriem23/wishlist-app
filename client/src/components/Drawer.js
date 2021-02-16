import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
import ProductAdd from "./ProductAdd";
import WishlistModal from "./WishlistModal";
import { Menu, Button, List } from "antd";

const Drawer = ({ type, setContent }) => {
  const dispatch = useDispatch();
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
        <Button>
          {type === "products" ? <ProductAdd /> : <WishlistModal />}
        </Button>
      </Menu>
    </div>
  );
};

export default Drawer;
