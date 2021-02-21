import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlists,
  deleteWishlist,
  editWishlist,
} from "../actions/wishlistActions";
import WishlistModal from "./WishlistModal";
import { getProducts } from "../actions/productActions";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
const { Title } = Typography;

const ProductList = ({ content, setContent }) => {
  const { wishlists } = useSelector((state) => state.wish);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlists());
    dispatch(getProducts());
  }, []);
  const deleteOneWishlist = (id) => {
    dispatch(deleteWishlist(id));
    if (wishlists.length === 1) {
      setContent("add_new");
    } else {
      setContent(wishlists[0]);
    }
  };
  return !editMode ? (
    <div>
      {content.wishlist ? (
        <div>
          <Row
            gutter={200}
            align="middle"
            style={{
              marginLeft: "5px",
            }}
          >
            <Title size={2}>{content.wishlist}</Title>

            <div style={{ color: "red" }}>
              <DeleteOutlined
                key="delete"
                onClick={() => {
                  deleteOneWishlist(content._id);
                }}
              />
            </div>
            <div style={{ color: "black" }}>
              <EditOutlined key="edit" onClick={() => setEditMode(true)} />
            </div>
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
