import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteWishlist } from "../actions/wishlistActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

const WishlistCard = ({ wishlist, products }) => {
  const dispatch = useDispatch();

  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };
  const { Title } = Typography;
  // useEffect(() => {
  //   console.log(products);
  // }, []);
  // {wishlists.wishlist === products.WishlistName
  //   ? wishlists.map((wishlist) => (
  //       <WishlistCard wishlist={wishlist} product={products} />
  //     ))
  //   : null}
  return (
    <div>
      <Row>
        <Col span={12}>
          <Title size={1}>{wishlist.wishlist}</Title>
        </Col>
        <Col span={12}>
          <DeleteOutlined
            key="delete"
            onClick={() => {
              deleteOneWishlist(wishlist._id);
            }}
          />
          <EditOutlined key="edit" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title>
            {products.map((el) => (
              <p>{el.WishlistName}</p>
            ))}
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default WishlistCard;
