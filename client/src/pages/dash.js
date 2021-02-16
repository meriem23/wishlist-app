import React, { useEffect } from "react";
import { Tabs, Button, Dropdown, Menu, message, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import ProductDetails from "../components/ProductDetails";
import { loadUser } from "../actions/authActions";
import Wishlist from "../components/Wishlist";
const { TabPane } = Tabs;

const Dashboard = () => {
  const [type, setType] = React.useState("wishlist");
  const [content, setContent] = React.useState("add_new");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const changeContent = (key) => {
    if (key === "1") {
      setType("wishlist");
    } else {
      setType("products");
    }
  };

  return user ? (
    <div className="tab-style">
      <Tabs onTabClick={changeContent}>
        <TabPane tab="Wishlists" key="1">
          <div className="row">
            <Drawer type={type} setContent={setContent} />
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              <Wishlist content={content} type={type} />
            </div>
          </div>
        </TabPane>
        <TabPane
          tab={<i className="fas fa-clipboard-list"> My Products</i>}
          key="2"
        >
          <div className="row">
            <Drawer type={type} setContent={setContent} />
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              {content === "add_new" ? (
                <Products />
              ) : (
                <ProductDetails content={content} type={type} />
              )}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  ) : null;
};

export default Dashboard;
