import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getProducts } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
import WishlistModal from "./WishlistModal";
import ProductAdd from "./ProductAdd";

const SideBar = ({ type, setContent }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wish);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Text } = Typography;
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
        style={{ width: 200, height: "85vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        onClick={showModal}
      >
        <Button
          type="ghost"
          className="add_btn"
          onClick={() => setContent("add_new")}
        >
          {type === "wishlist" ? (
            <WishlistModal />
          ) : (
            <Text className="textStyle">
              <PlusOutlined
                style={{ color: "#4bb2f2", marginRight: 20, fontSize: 15 }}
              />
              Add Product
            </Text>
          )}
        </Button>
        {type === "product"
          ? products.map((el) => (
              <Menu.Item onClick={() => setContent(el)}>{el.Name}</Menu.Item>
            ))
          : type === "wishlist"
          ? wishlists.map((el) => (
              <Menu.Item onClick={() => setContent(el)}>
                {el.wishlist}
              </Menu.Item>
            ))
          : null}
      </Menu>
    </div>
  );
};

export default SideBar;
