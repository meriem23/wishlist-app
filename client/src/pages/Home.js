import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tabs } from "antd";
import { loadUser } from "../actions/authActions";
import UserAvatar from "../components/UserAvatar";
import WishlistModal from "../components/WishlistModal";
import ProductAdd from "../components/ProductAdd";
import ProductList from "../components/ProductList";

const Dash = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  return user ? (
    <div>
      <Row>
        <Col push={21}>
          <UserAvatar />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Wishlists" key="1">
              <WishlistModal />
            </TabPane>
            <TabPane tab="Products" key="2">
              <ProductAdd />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default Dash;
