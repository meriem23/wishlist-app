import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  FileImageOutlined,
  FileTextOutlined,
  IdcardOutlined,
  FormOutlined,
  DownloadOutlined,
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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="add_form_style">
      <div className="form_text">
        <Title
          level={3}
          style={{
            color: "#4bb2f2",
            textTransform: "upperCase",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          Add Product
        </Title>
      </div>

      <Form
        form={form}
        style={{
          width: 150,
          display: "flex",
          flexDirection: "column",
        }}
        initialValues={{ remember: false }}
        {...layout}
        className="add_product_form"
      >
        <Form.Item className="form_item" name="name">
          <Input
            className="add_product_input"
            prefix={<IdcardOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%" }}
            placeholder="Name"
            name="Name"
            onChange={handleChange}
            value={
              editMode && productToUpdate ? productToUpdate.Name : product.Name
            }
          />
        </Form.Item>
        <Form.Item className="form_item" name="price">
          <Input
            className="add_product_input"
            prefix={<MoneyCollectOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%" }}
            placeholder="Price"
            name="Price"
            onChange={handleChange}
            value={
              editMode && productToUpdate
                ? productToUpdate.Price
                : product.Price
            }
          />
        </Form.Item>
        <Form.Item className="form_item" name="description">
          <Input
            className="add_product_input"
            prefix={<FileTextOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%" }}
            placeholder="Description"
            name="Description"
            onChange={handleChange}
            value={
              editMode && productToUpdate
                ? productToUpdate.Description
                : product.Description
            }
          />
        </Form.Item>
        <Form.Item className="form_item" name="status">
          <Select
            className="add_product_input"
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%" }}
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
        </Form.Item>
        <Form.Item className="form_item" name="wishlist">
          <Select
            className="add_product_input"
            suffixIcon={<FormOutlined style={{ color: "#4bb2f2" }} />}
            style={{ width: "100%" }}
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
        </Form.Item>
        <Form.Item className="form_item form_item_label_img" name="image">
          <Input
            className="add_product_input "
            prefix={<FileImageOutlined style={{ color: "#4bb2f2" }} />}
            type="file"
            name="Image"
            onChange={handleChangeImage}
          />
        </Form.Item>
        <Form.Item className="form_item">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="btn_product_form"
          >
            {editMode && productToUpdate ? "Edit" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
