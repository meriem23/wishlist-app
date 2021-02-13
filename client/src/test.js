<Form
name="normal_login"
className="login-form"
initialValues={{
  remember: true,
}}
onFinish={onFinish}
>
<Form.Item
  name="email"
  rules={[
    {
      required: true,
      message: 'Please enter you email',
    },
  ]}
>
  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Uemail" />
</Form.Item>
<Form.Item
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your Password!',
    },
  ]}
>
  <Input
    prefix={<LockOutlined className="site-form-item-icon" />}
    type="password"
    placeholder="Password"
  />
</Form.Item>

<Form.Item>
  <Button type="primary" htmlType="submit" className="login-form-button">
    Log in
  </Button>
  Or <a href="">register now!</a>
</Form.Item>
</Form>