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
      {content.wishlist ? (
        <div>
          <Row
            gutter={200}
            align="middle"
            style={{
              marginLeft: "5px",
            }}
          >
            <Title size={2}>{content.wishlist}</Title>

            <div style={{ color: "red" }}>
              <DeleteOutlined
                key="delete"
                onClick={() => {
                  deleteOneWishlist(content._id);
                }}
              />
              <span>Delete</span>
            </div>

            <div style={{ color: "black" }}>
              <EditOutlined key="edit" />
              <span>Edit</span>
            </div>
          </Row>
          <Row>
            <Title>
              {products.map((el) => (
                <div
                  style={{
                    border: "1px solid #eeeeee",
                    marginLeft: "15px",
                    width: "max-content",
                  }}
                >
                  <p>{el.Status}</p>
                </div>
              ))}
            </Title>
          </Row>
          <Row>
            {products.map((el) => (
              <div
                style={{
                  border: "1px solid #eeeeee",
                  marginLeft: "15px",
                  width: "max-content",
                }}
              >
                <p>{el.Name}</p>
              </div>
            ))}
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
