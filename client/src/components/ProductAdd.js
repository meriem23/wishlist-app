import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Typography, Image, Select, Upload } from "antd";
import {
  MoneyCollectOutlined,
  FileImageOutlined,
  FileTextOutlined,
  IdcardOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { addProduct, editProduct } from "../actions/productActions";
import { getWishlists } from "../actions/wishlistActions";
const { Option } = Select;
const { Title } = Typography;

const ProductAdd = ({ editMode, setEditMode, content }) => {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wish);
  useEffect(() => {
    dispatch(getWishlists());
  }, []);

  useEffect(() => {
    if (editMode) {
      setProductToUpdate(content);
    } else return;
  }, [editMode]);

  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Image: "",
    Price: "",
  });
  const [Status, setStatus] = useState(null);
  const [WishlistName, setWishlist] = useState(null);
  const [form] = Form.useForm();
  const handleChange = (e) => {
    if (editMode) {
      setProductToUpdate({
        ...productToUpdate,
        [e.target.name]: e.target.value,
      });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  const handleStatus = (value) => {
    if (editMode) {
      setProductToUpdate({ ...productToUpdate, Status: value });
    } else {
      setProduct({ ...product, Status: value });
    }
  };
  const handleWishlist = (value) => {
    if (editMode) {
      setProductToUpdate({ ...productToUpdate, WishlistName: value });
    } else {
      setProduct({ ...product, WishlistName: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(editProduct(productToUpdate));
      setEditMode(false);
    } else {
      dispatch(addProduct(product));
    }
  };

  const handleChangeImage = (e) => {
    if (editMode) {
      setProductToUpdate({ ...productToUpdate, Image: e.target.files[0] });
    } else {
      setProduct({ ...product, Image: e.target.files[0] });
    }
  };

  return (
    <div className="addFormStyle">
      <div className="formText">
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
            value={
              editMode && productToUpdate ? productToUpdate.Name : product.Name
            }
          />
          <Input
            prefix={<MoneyCollectOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Price"
            name="Price"
            onChange={handleChange}
            value={
              editMode && productToUpdate
                ? productToUpdate.Price
                : product.Price
            }
          />

          <Input
            prefix={<FileTextOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Description"
            name="Description"
            onChange={handleChange}
            value={
              editMode && productToUpdate
                ? productToUpdate.Description
                : product.Description
            }
          />
          <Select
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Status"
            onChange={handleStatus}
            value={
              editMode && productToUpdate
                ? productToUpdate.Status
                : product.Status
            }
          >
            <Option value="To Buy">To Buy</Option>
            <Option value="Bought">Bought</Option>
          </Select>
          <Select
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%", margin: "10px 0px" }}
            placeholder="Wishlist"
            onChange={handleWishlist}
            value={
              editMode && productToUpdate
                ? productToUpdate.WishlistName
                : product.WishlistName
            }
          >
            {wishlists.map((el) => (
              <Option value={el.wishlist}>{el.wishlist}</Option>
            ))}
          </Select>
          <Input
            prefix={<FileImageOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Product Image"
            type="file"
            name="Image"
            onChange={handleChangeImage}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            {editMode && productToUpdate ? "Edit" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
