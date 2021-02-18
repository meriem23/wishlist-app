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
        <p onClick={() => dispatch(logoutUser())}>{`${user.fname}, logout?`}</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="avatarHover">
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
