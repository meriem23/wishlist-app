import { useState } from "react";
import { Form, Input, Button, Typography, Image, Upload } from "antd";
import {
  MoneyCollectOutlined,
  FileImageOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const ProductAdd = () => {
  const [prod, setProd] = useState({
    pName: "",
    pDesc: "",
    pPrice: 0,
    pStatus: "",
  });
  const [file, setFile] = useState(null);
  const { Title } = Typography;
  const handleChange = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value });
  };
  const uploadImage = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="formStyle">
      <div className="formText">
        <Image
          width={35}
          preview={false}
          src="./wishlist.png"
          alt="wishlist logo"
        />
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
            placeholder="Product Name"
            name="pName"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MoneyCollectOutlined />}
            placeholder="Product Price"
            name="pPrice"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<FileTextOutlined />}
            placeholder="Product Description"
            name="pDesc"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<FileImageOutlined />}
            placeholder="Product Image"
            name="pImage"
            type="file"
            onChange={uploadImage}
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
