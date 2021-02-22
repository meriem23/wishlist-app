import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists, deleteWishlist } from "../actions/wishlistActions";
import WishlistModal from "./WishlistModal";
import { getProducts } from "../actions/productActions";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Typography } from "antd";
const { Title } = Typography;

const ProductList = ({ content, setContent }) => {
  const { wishlists } = useSelector((state) => state.wish);
  const { products } = useSelector((state) => state.product);
  const [editMode, setEditMode] = useState(false);
  const [type, setType] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlists());
    dispatch(getProducts());
  }, []);
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
  };

  return !editMode ? (
    <div className="prodStyle">
      {content.wishlist ? (
        <div>
          <Row
            gutter={200}
            align="middle"
            style={{
              marginLeft: 50,
            }}
          >
            <Title size={2}>{content.wishlist}</Title>
            <div style={{ display: "flex", marginLeft: 300 }}>
              <p style={{ color: "red" }}>
                <DeleteOutlined
                  key="delete"
                  onClick={() => {
                    deleteOneWishlist(content._id);
                  }}
                />
              </p>
              <p style={{ color: "black" }}>
                <EditOutlined key="edit" onClick={() => setEditMode(true)} />
              </p>
            </div>
          </Row>
          <Row>
            {/* <Menu
              style={{
                height: "85vh",
                border: "1px solid #eeee",
                width: 550,
                height: 50,
                marginLeft: 50,
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="horizontal"
            >
              <Menu.Item>To Buy</Menu.Item>

              <Menu.Item>Bought</Menu.Item>
            </Menu> */}
          </Row>
        </div>
      ) : null}
    </div>
  ) : (
    <AnimatePresence exitBeforeEnter={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <WishlistModal
          editMode={editMode}
          setEditMode={setEditMode}
          content={content}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductList;
