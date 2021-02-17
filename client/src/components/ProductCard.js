import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/productActions";
import { Card, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductCard = ({ product, type, content }) => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const deleteOneProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={<img alt={product.Name} src={product.Image} />}
        actions={[
          <DeleteOutlined
            key="delete"
            onClick={() => {
              deleteOneProduct(product._id);
            }}
          />,
          <EditOutlined key="edit" />,
        ]}
      >
        <Title level={3}>{product.Name}</Title>
        <Text>{product.Description}</Text>
      </Card>
    </div>
  );
};

export default ProductCard;
