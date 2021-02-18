import React from "react";
import { useDispatch } from "react-redux";
import { deleteWishlist } from "../actions/wishlistActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const WishlistCard = ({ wishlist }) => {
  const dispatch = useDispatch();
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };
  const { Text } = Typography;
  return (
    <div>
      <Text>{wishlist.wishlist}</Text>
      <DeleteOutlined
        key="delete"
        onClick={() => {
          deleteOneWishlist(wishlist._id);
        }}
      />
      <EditOutlined key="edit" />
    </div>
  );
};

export default WishlistCard;
