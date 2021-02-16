import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlists, deleteWishlist } from "../actions/wishlistActions";
import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
  }, []);
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };
  const { wishlists } = useSelector((state) => state.wish);
  const { Text } = Typography;
  return (
    <div>
      {wishlists.map((wish, i) => (
        <div key={i}>
          <Text>{wish.wishlist}</Text>
          <DeleteOutlined
            onClick={() => {
              deleteOneWishlist(wish._id);
            }}
            style={{ color: "red", fontSize: "20px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
