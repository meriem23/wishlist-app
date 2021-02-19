import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/productActions";
import { Card, Typography, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductCard = ({ content }) => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const deleteOneProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      {content && (
        <Card
          style={{ width: 300 }}
          cover={<img alt={content.Name} src={content.Image} />}
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
          <Title level={3}>{content.Name}</Title>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text>{content.Price}</Text>
            <Text>{content.Description}</Text>
            <Text>{content.Status}</Text>
            <Text>{content.WishlistName}</Text>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductCard;
