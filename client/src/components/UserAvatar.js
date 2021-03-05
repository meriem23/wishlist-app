import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { logoutUser } from "../actions/authActions";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menu = (
    <Menu>
      <Menu.Item
        icon={
          <LogoutOutlined
            style={{ color: "#4bb2f2" }}
            onClick={() => dispatch(logoutUser())}
          />
        }
      ></Menu.Item>
    </Menu>
  );
  return (
    <div className="avatar_hover">
      <Avatar
        style={{ backgroundColor: "#4bb2f2" }}
        size={45}
        icon={`${user.lname.slice(0, 1)} ${user.fname.slice(0, 1)}`}
      />
      <Dropdown overlay={menu}>
        <DownOutlined style={{ color: "#4bb2f2" }} />
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
