import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button, List } from "antd";
import { getProducts } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
import ProductAdd from "./ProductAdd";
import WishlistModal from "./WishlistModal";
import WishlistDetails from "./WishlistDetails";

const SideBar = ({ type, setContent }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wish);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (type === "product") {
      dispatch(getProducts());
    } else if (type === "wishlist") {
      dispatch(getWishlists());
    }
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div>
      <Menu
        style={{ width: 250 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        onClick={showModal}
      >
        <Button type="ghost" className="add_btn">
          {type === "wishlist" ? <WishlistModal /> : null}
        </Button>
        {type === "product"
          ? products && products.map((el) => <Menu.Item>{el.Name}</Menu.Item>)
          : type === "wishlist"
          ? wishlists &&
            wishlists.map((el) => (
              <Menu.Item onClick={() => console.log("hello")}>
                {/* {el.wishlist} */}
                <WishlistDetails el={el} />
              </Menu.Item>
            ))
          : null}
      </Menu>
    </div>
  );
};

export default SideBar;
