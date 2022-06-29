import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { logIn, getLoginStatus } from "../../../features/user/userSlice";
import "./index.scss";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logInStatus = useSelector(getLoginStatus);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    logInStatus.isSuccess && navigate("/");
  }, [logInStatus]);

  const LogInForm = () => (
    <div className="log-in-container">
      <h1>{t('login-header')}</h1>
      <Form name="log in" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder={t('username-label')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              type: "password",
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder={t('password-label')} />
        </Form.Item>
        <Form.Item>
          <div className="submit-form-item">
            <Link to="/signup" className="change-form">
              {t('register-account')}
            </Link>
            <Button type="primary" htmlType="submit">
              {t('login-submit')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );

  const handleSubmit = (values) => {
    dispatch(logIn(values));
  };

  return (
    <div className="login-register-container">
      <LogInForm />
    </div>
  );
};

export default LogIn;
