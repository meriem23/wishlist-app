import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Typography, Image } from "antd";
import {
  MoneyCollectOutlined,
  FileImageOutlined,
  FileTextOutlined,
  UploadOutlined,
  IdcardOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { addProduct } from "../actions/productActions";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Status: "",
  });
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const addNewProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    form.resetFields();
  };
  return (
    <div className="formAddStyle">
      <div className="formText">
        <Image
          width={35}
          preview={false}
          src="./wishlist.png"
          alt="wishlist logo"
        />
        <Title level={3}>Add Product</Title>
      </div>
      <Form
        form={form}
        style={{
          width: 310,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 15,
        }}
      >
        <Form.Item>
          <Input
            prefix={<IdcardOutlined />}
            placeholder="Product Name"
            name="Name"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MoneyCollectOutlined />}
            placeholder="Product Price"
            name="Price"
            onChange={handleChange}
            type="number"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<FileTextOutlined />}
            placeholder="Product Description"
            name="Description"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<FormOutlined />}
            placeholder="Product Status"
            name="Status"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={addNewProduct}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
