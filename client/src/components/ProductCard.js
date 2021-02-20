import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../actions/productActions";
import { Card, Typography, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductCard = ({ content, setContent }) => {
  const { Text } = Typography;
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const deleteOneProduct = (id) => {
    dispatch(deleteProduct(id));
    if (products.length === 1) {
      setContent("add_new");
    } else {
      setContent(products[0]);
    }
  };
  return (
    <div className="cardStyle">
      {content.Name ? (
        <Card
          style={{ width: 290 }}
          hoverable={true}
          cover={
            <img
              alt={content.Name}
              src={process.env.REACT_APP_STORAGE + content.Image}
              style={{
                width: " 100%",
                height: "auto",
                border: "1px solid #eeeeee",
              }}
            />
          }
          title={content.Name}
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={() => {
                deleteOneProduct(content._id);
              }}
            />,
            <EditOutlined key="edit" />,
          ]}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text>
              <span>Price: </span> {content.Price}
            </Text>
            <Text>
              <span>Description: </span>
              {content.Description}
            </Text>
            <div>
              <Text>
                <span>Status: </span> {content.Status}
              </Text>
              <Text style={{ marginLeft: "15px" }}>
                <span>Wishlist: </span>
                {content.WishlistName}
              </Text>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default ProductCard;
