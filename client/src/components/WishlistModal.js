import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Typography } from "antd";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { addWishlist, editWishlist } from "../actions/wishlistActions";
const { Text } = Typography;

const WishlistModal = ({ editMode, setEditMode, content }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState({ wishlist: "" });
  const [wishToUpdate, setWishToUpdate] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (editMode) {
      setWishToUpdate(content);
      setIsModalVisible(true);
    } else return;
  }, [editMode]);
  const handleChange = (e) => {
    if (editMode) {
      setWishToUpdate({
        ...wishToUpdate,
        [e.target.name]: e.target.value,
      });
    } else {
      setWishlist({ ...wishlist, [e.target.name]: e.target.value });
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    if (editMode) {
      dispatch(editWishlist(wishToUpdate));
      setEditMode(false);
      console.log("edit mode on");
    } else {
      dispatch(addWishlist(wishlist));
    }
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {!editMode ? (
        <Text onClick={showModal} className="text_style">
          <PlusOutlined
            style={{ color: "#4bb2f2", marginRight: 10, fontSize: 16 }}
          />
          Add Wishlist
        </Text>
      ) : null}
      <Modal
        title="Add Wishlist"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editMode && wishToUpdate ? "Edit" : "Add"}
        width="350px"
      >
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item name="wishlist">
            <Input
              prefix={<HeartOutlined style={{ color: "#4bb2f2" }} />}
              style={{ width: "155%" }}
              placeholder="Name"
              name="wishlist"
              onChange={handleChange}
              value={
                editMode && wishToUpdate
                  ? wishToUpdate.wishlist
                  : wishlist.wishlist
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WishlistModal;
