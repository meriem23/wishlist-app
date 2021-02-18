import { Form, Input, Button, Typography, Image } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authActions";
import { useHistory } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      history.push("/home");
    }
  }, [isAuth]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerNew = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };
  const { Title } = Typography;
  return (
    <div className="formStyle">
      <div className="formText">
        <Image
          width={35}
          preview={false}
          src="./wishlist.png"
          alt="wishlist logo"
        />
        <Title level={3}>Register</Title>
      </div>
      <Form
        initialValues={{
          remember: true,
        }}
        style={{
          width: 310,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 15,
        }}
      >
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Your First Name"
            name="fname"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your last name...",
              type: "string",
            },
          ]}
        >
          <Input
            prefix={<TeamOutlined />}
            placeholder="Your Last Name"
            name="lname"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your email...",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Your Email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Your Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={registerNew}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
