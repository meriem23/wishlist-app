import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, Dropdown, Typography } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logoutUser } from "../actions/authActions";
const { Text } = Typography;

const UserAvatar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menu = (
    <Menu style={{ marginTop: 15 }}>
      <Menu.Item>
        <div>
          <Text strong>
            <UserOutlined style={{ color: "#4bb2f2", marginRight: 5 }} />
            {`${user.fname} ${user.lname}`}
          </Text>
        </div>
        <div>
          <Text>
            <MailOutlined style={{ color: "#4bb2f2", marginRight: 5 }} />
            {`${user.email}`}
          </Text>
        </div>
        <div>
          <LogoutOutlined
            style={{ color: "#4bb2f2", marginRight: 5 }}
            onClick={() => dispatch(logoutUser())}
          />
          <Text onClick={() => dispatch(logoutUser())}>Logout</Text>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="avatar_hover">
      <Avatar
        style={{ backgroundColor: "#4bb2f2", border: "1px solid white" }}
        size={40}
        icon={`${user.lname.slice(0, 1)}`}
      />

      <Dropdown overlay={menu}>
        <DownOutlined style={{ color: "#4bb2f2" }} />
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
