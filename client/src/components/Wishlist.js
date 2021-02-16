import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlists } from "../actions/wishlistActions";
import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
  }, []);
  const { wishlists } = useSelector((state) => state.wish);
  const { Text } = Typography;
  return (
    <div>
      <Text>Ant Design</Text>{" "}
      <DeleteOutlined
        onClick={() => console.log("hello")}
        style={{ color: "red", fontSize: "20px" }}
      />
      {wishlists.map((wish, i) => (
        <p key={i}>{wish.wishlist}</p>
      ))}
    </div>
  );
};

export default ProductList;
