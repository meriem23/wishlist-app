import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const WishlistModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState({ wishlist: "" });
  const handleChange = (e) => {
    setWishlist({ ...wishlist, [e.target.name]: e.target.value });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add a Wishlist
      </Button>
      <Modal
        title="Wishlist Name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        width="290px"
      >
        <Form
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
