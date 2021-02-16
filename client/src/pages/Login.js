import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Typography, Image } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../actions/authActions";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  useEffect(() => {
    if (isAuth) {
      history.push("/home");
    }
  }, [isAuth]);
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
        <Title level={3}>Sign In</Title>
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
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email...",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Your email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Your password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={login}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Title level={5}>
        Don't have an account? <Link to="/register">Create one now!</Link>
      </Title>
    </div>
  );
};

export default Login;
