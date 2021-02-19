import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Typography, Image, Select } from "antd";
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
  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wish);
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Image: "",
    Price: 0,
  });
  const [Status, setStatus] = useState({
    Status: "",
  });
  const [WishlistName, setWishlist] = useState({
    WishlistName: "",
  });
  const { Title } = Typography;
  const [form] = Form.useForm();
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleStatus = (value) => {
    setStatus(value);
  };
  const handleWishlist = (value) => {
    setWishlist(value);
  };
  const info = { Status, ...product, WishlistName };
  const addNewProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(info));
  };
  return (
    <div>
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
        initialValues={{ remember: false }}
      >
        <Form.Item rules={[{ required: true }]}>
          <Input
            prefix={<FileImageOutlined />}
            placeholder="Product Image"
            name="Image"
            type="file"
            onChange={(e) =>
              setProduct({ ...product, Image: e.target.files[0] })
            }
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
