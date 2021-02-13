import { Form, Input, Button, Typography } from "antd";
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
      <Title level={2}>Register</Title>
      <Form
        {...layout}
        style={{
          width: 310,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 15,
        }}
      >
        <Form.Item label="First Name" name="fname">
          <Input
            placeholder="Your first name"
            name="fname"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Last Name" name="lname">
          <Input
            placeholder="Your last name"
            name="lname"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Email"
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
            placeholder="Your email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Your password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={registerNew}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
