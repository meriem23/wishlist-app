import { useState } from "react";
import {Link} from 'react-router-dom'
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { Title } = Typography;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 12,
      span: 8,
    },
  };
  return (
    <div>
      <Title level={2}>Sign In</Title>
      <Form
        {...layout}
        name="basic"
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
            prefix={<UserOutlined className="site-form-item-icon" />}
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
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
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
