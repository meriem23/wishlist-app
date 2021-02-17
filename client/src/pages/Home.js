import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tabs, Drawer } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { loadUser } from "../actions/authActions";
import UserAvatar from "../components/UserAvatar";
import WishlistModal from "../components/WishlistModal";
import ProductAdd from "../components/ProductAdd";
import ProductList from "../components/ProductList";
import Wishlist from "../components/Wishlist";

const Dash = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("add_new");
  const [type, setType] = useState("wishlist");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { TabPane } = Tabs;

  const changeContent = (key) => {
    if (key === "1") {
      setType("wishlist");
    } else {
      setType("product");
    }
  };

  return user ? (
    <div>
      <Row>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            onChange={changeContent}
            tabBarExtraContent={<UserAvatar />}
            className="tabStyle"
          >
            <TabPane tab="Wishlists" key="1">
              <Row>
                <Drawer type={type} setContent={setContent} />
                <Col>
                  <h1>Wishlist page</h1>
                  <Wishlist content={content} type={type} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Products" key="2">
              <Row>
                <Drawer type={type} setContent={setContent} />
                <Col>
                  <h1>Products page</h1>
                  {content === "add_new" ? (
                    <ProductAdd />
                  ) : (
                    <ProductList content={content} type={type} />
                  )}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default Dash;
