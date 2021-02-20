import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tabs } from "antd";
import { loadUser } from "../actions/authActions";
import UserAvatar from "../components/UserAvatar";
import WishlistModal from "../components/WishlistModal";
import ProductAdd from "../components/ProductAdd";
import ProductList from "../components/ProductList";
import Wishlist from "../components/Wishlist";
import SideBar from "../components/SideBar";
import ProductCard from "../components/ProductCard";

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
            <TabPane
              tab={<i className="far fa-heart iconStyle"> Wishlist</i>}
              key="1"
            >
              <Row>
                <SideBar type={type} setContent={setContent} />
                <Col>
                  <Wishlist content={content} type={type} />
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={<i className="far fa-file-word"> Products</i>}
              key="2"
            >
              <Row>
                <SideBar type={type} setContent={setContent} />
                <Col>
                  {content === "add_new" ? (
                    <ProductAdd />
                  ) : (
                    <ProductCard content={content} />
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
