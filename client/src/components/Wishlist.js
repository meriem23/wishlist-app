import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlists, deleteWishlist } from "../actions/wishlistActions";
import WishlistModal from "./WishlistModal";
import { getProducts } from "../actions/productActions";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Typography, Col, Tabs } from "antd";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
      {content ? (
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
            <Tabs defaultActiveKey="1" className="tabStyle">
              <TabPane tab="To Buy" key="1">
                {content.product &&
                  content.product
                    .filter((el) => "To Buy" === el.Status)
                    .map((el) => (
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Text> Product Name: {el.Name}</Text>
                      </div>
                    ))}
              </TabPane>
              <TabPane tab="Bought" key="2">
                {content.product &&
                  content.product
                    .filter((el) => "Bought" === el.Status)
                    .map((el) => (
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Text> Product Name: {el.Name}</Text>
                      </div>
                    ))}
              </TabPane>
            </Tabs>
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
