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
        <Form.Item>
          <Input
            prefix={<MailOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your email"
            name="email"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={handleChange}
          />
          <Input.Password
            prefix={<LockOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your password"
            name="password"
            style={{ width: "100%", margin: "10px 0px" }}
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
