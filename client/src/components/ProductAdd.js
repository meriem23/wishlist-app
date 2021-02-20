import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Typography, Image, Select, Upload } from "antd";
import {
  MoneyCollectOutlined,
  FileImageOutlined,
  FileTextOutlined,
  IdcardOutlined,
  FormOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { addProduct } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
import axios from "axios";

const ProductAdd = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wish);
  useEffect(() => {
    dispatch(getWishlists());
  }, []);
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Image: "",
    Price: 0,
  });
  const [Status, setStatus] = useState(null);
  const [WishlistName, setWishlist] = useState(null);
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
  let info = { Status, ...product, WishlistName };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(info));
  };
  return (
    <div className="addFormStyle">
      <div className="formText">
        {/* <Image
          width={35}
          preview={false}
          src="./wishlist.png"
          alt="wishlist logo"
        /> */}
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
            prefix={<IdcardOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Name"
            name="Name"
            onChange={handleChange}
          />
          <Input
            prefix={<MoneyCollectOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Price"
            name="Price"
            onChange={handleChange}
          />

          <Input
            prefix={<FileTextOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Description"
            name="Description"
            onChange={handleChange}
          />
          <Select
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Status"
            onChange={handleStatus}
          >
            <Option value="To Buy">To Buy</Option>
            <Option value="Bought">Bought</Option>
          </Select>
          <Select
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Wishlist"
            onChange={handleWishlist}
          >
            {wishlists.map((el) => (
              <Option value={el.wishlist}>{el.wishlist}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item rules={[{ required: true }]}>
          <Input
            prefix={<FileImageOutlined />}
            placeholder="Product Image"
            type="file"
            name="Image"
            onChange={(e) =>
              setProduct({ ...product, Image: e.target.files[0] })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
