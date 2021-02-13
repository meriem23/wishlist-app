import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { logoutUser } from "../actions/authActions";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => dispatch(logoutUser())}>Logout</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <Button className="btn">
          <Avatar
            style={{ backgroundColor: "#4bb2f2" }}
            size={50}
            icon={`${user.lname.slice(0, 1)} ${user.fname.slice(0, 1)}`}
          />
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
