import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/productActions";
import { Card, Typography, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductCard = ({ content }) => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const deleteOneProduct = (id) => {
    dispatch(deleteProduct(id));
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
              src={content.Image}
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
