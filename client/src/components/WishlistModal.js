import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Typography } from "antd";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { addWishlist } from "../actions/wishlistActions";

const WishlistModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState({ wishlist: "" });
  const { Text } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setWishlist({ ...wishlist, [e.target.name]: e.target.value });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(addWishlist(wishlist));
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //
  return (
    <div>
      <Text onClick={showModal} className="textStyle">
        <PlusOutlined
          style={{ color: "#4bb2f2", marginRight: 20, fontSize: 15 }}
        />
        Add Wishlist
      </Text>
      <Modal
        title="Wishlist Name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        width="290px"
      >
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          // style={{
          //   width: 310,
          //   display: "flex",
          //   justifyContent: "center",
          //   flexDirection: "column",
          //   marginTop: 15,
          // }}
        >
          <Form.Item
            name="wishlist"
            rules={[
              {
                required: true,
                message: "Please enter a wishlist name...",
              },
            ]}
          >
            <Input
              prefix={<HeartOutlined className="site-form-item-icon" />}
              placeholder="Your Wishlist name"
              name="wishlist"
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WishlistModal;
