import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const menu = (
    <Menu>
      <Menu.Item>
        <h6>logout</h6>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {user && (
        <div>
          <h1>hello from home</h1>
          <Dropdown overlay={menu}>
            <Button className="btn">
              <Avatar
                shape="square"
                size={50}
                // style={{
                //   backgroundColor: "#4bb2f2",
                //   textTransform: "uppercase",
                // }}
                icon={`${user.lname.slice(0, 1)} ${user.fname.slice(0, 1)}`}
              />
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Home;
