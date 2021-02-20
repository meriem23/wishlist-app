import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists, deleteWishlist } from "../actions/wishlistActions";
import { getProducts } from "../actions/productActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
const { Title } = Typography;

const ProductList = ({ content, type }) => {
  const { wishlists } = useSelector((state) => state.wish);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
    dispatch(getProducts());
    console.log(wishlists);
  }, []);
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };

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
            </div>

            <div style={{ color: "black" }}>
              <EditOutlined key="edit" />
            </div>
          </Row>
          <Row>
            {/* <Title>
              {wishlists.map((el) => (
                <div
                  style={{
                    border: "1px solid #eeeeee",
                    marginLeft: "15px",
                    width: "max-content",
                  }}
                >
                  <p>{el}</p>
                </div>
              ))}
            </Title> */}
          </Row>
          {/* <Row>
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
          </Row> */}
          hello
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
