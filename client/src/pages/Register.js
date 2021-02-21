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
import { useHistory, Link } from "react-router-dom";
const { Title } = Typography;

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
  return (
    <div className="regFormStyle">
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
            prefix={<UserOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your First Name"
            name="fname"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={handleChange}
          />
          <Input
            prefix={<TeamOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your Last Name"
            name="lname"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={handleChange}
          />
          <Input
            prefix={<MailOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your Email"
            name="email"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={handleChange}
          />
          <Input.Password
            prefix={<LockOutlined style={{ color: "#4bb2f2" }} />}
            placeholder="Your Password"
            name="password"
            style={{ width: "100%", margin: "10px 0px" }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={registerNew}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Title level={5}>
        Already have an account? <Link to="/">Sign in now!</Link>
      </Title>
    </div>
  );
};

export default Register;
