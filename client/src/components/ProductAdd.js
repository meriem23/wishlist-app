import { useState } from "react";
import { Form, Input, Button, Typography, Image } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const ProductAdd = () => {
  const [prod, setProd] = useState({
    pName: "",
    pDesc: "",
    pPrice: 0,
    pImage: "",
    pStatus: "",
  });
  const { Title } = Typography;
  const handleChange = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value });
  };
  return (
    <div className="formStyle">
      <div className="formText">
        <Image width={35} src="./wishlist.png" />
        <Title level={3}>Add Product</Title>
      </div>
      <Form
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Product Name"
            name="pName"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Product Price"
            name="pPrice"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Product Description"
            name="pDesc"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Product Image"
            name="pImage"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
