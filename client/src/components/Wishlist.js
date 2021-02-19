import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists, deleteWishlist } from "../actions/wishlistActions";
import { getProducts } from "../actions/productActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

const ProductList = ({ content, type }) => {
  const { wishlists } = useSelector((state) => state.wish);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
    dispatch(getProducts());
  }, []);
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };
  const { Title } = Typography;
  return (
    <div>
      <Row>
        <Col span={15}>
          <Title size={1}>{content.wishlist}</Title>
        </Col>
        <Col span={9}>
          <DeleteOutlined
            key="delete"
            onClick={() => {
              deleteOneWishlist(content._id);
            }}
          />
          <EditOutlined key="edit" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title style={{ color: "red" }}>
            {products.map((el) => (
              <div>
                <p>{el.WishlistName}</p>
                <p>{el.Status}</p>
              </div>
            ))}
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
