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
    <div className="form_container">
      <div className="form_style_log_reg">
        <div className="form_text">
          {/* <Image
          width={35}
          preview={false}
          src="./wishlist.png"
          alt="wishlist logo"
        /> */}
          <Title level={3} style={{ color: "#4bb2f2" }}>
            Register
          </Title>
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
              placeholder="First Name"
              name="fname"
              style={{ width: "100%", margin: "10px 0px" }}
              onChange={handleChange}
            />
            <Input
              prefix={<TeamOutlined style={{ color: "#4bb2f2" }} />}
              placeholder="Last Name"
              name="lname"
              style={{ width: "100%", margin: "10px 0px" }}
              onChange={handleChange}
            />
            <Input
              prefix={<MailOutlined style={{ color: "#4bb2f2" }} />}
              placeholder="Email"
              name="email"
              style={{ width: "100%", margin: "10px 0px" }}
              onChange={handleChange}
            />
            <Input.Password
              prefix={<LockOutlined style={{ color: "#4bb2f2" }} />}
              placeholder="Password"
              name="password"
              style={{ width: "100%", margin: "10px 0px" }}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn_log_reg"
              onClick={registerNew}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Title level={5}>
          Already have an account? <Link to="/">Sign in now!</Link>
        </Title>
      </div>
    </div>
  );
};

export default Register;
