import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { FieldType } from "../types/state";
import { UserOutlined, UnlockOutlined, LoginOutlined } from "@ant-design/icons";
import Bottom from "./Bottom";
import { authLogin } from "../api/user";
import { useAppDispatch } from "../redux/hooks";
import { saveToken } from "../redux/modules/user";

const Wrap = styled.div`
  height: calc(90vh);
  display: flex;
  .desc {
    background-image: url("https://pic.imgdb.cn/item/65ae7119871b83018ae458d3.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
    width: 75%;
    @media screen and (max-width: 1500px) {
      width: 70%;
    }
    @media screen and (max-width: 1150px) {
      width: 65%;
    }
    @media screen and (max-width: 950px) {
      width: 60%;
    }
    @media screen and (max-width: 850px) {
      width: 55%;
    }
    @media screen and (max-width: 750px) {
      width: 50%;
    }
    @media screen and (max-width: 650px) {
      width: 35%;
    }
    @media screen and (max-width: 530px) {
      display: none;
    }
  }
  .form {
    flex: 1;
    color: white;
    padding-top: 70px;
    .forminput {
      width: 300px;
      margin: 0 auto;
      .logo {
        user-select: none;
        cursor: pointer;
        margin-left: 10px;
        height: 40px;
        color: black;
        font-size: 40px;
        font-family: "Bungler";
      }
    }
  }
`;

type Props = {
  login: () => void;
  close: () => void;
};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <Wrap>
      {contextHolder}
      <div className="form center">
        <div className="forminput">
          <div className="logo">ZOOM Magic Internet</div>
          <div
            style={{ color: "#161616", fontSize: "15px", marginTop: "10px", marginLeft: "10px", fontWeight: "bolder" }}
          >
            助您到達全球任意角落 網絡有價 自由無價
          </div>
          <Form
            name="login"
            style={{ paddingLeft: "10px", margin: "30px 0px" }}
            initialValues={{ remember: true }}
            onFinish={(e) => {
              authLogin(e.username, e.password, messageApi, props.close, (token: string) => {
                dispatch(saveToken(token));
              });
            }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ type: "email", required: true, message: "请输入有效邮箱" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#cecece" }} />}
                placeholder="请输入注册邮箱"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              hasFeedback
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
                { min: 6, message: "密码长度6-14" },
              ]}
            >
              <Input.Password
                prefix={<UnlockOutlined style={{ color: "#cecece" }} />}
                maxLength={14}
                showCount
                placeholder="请输入密码"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%", backgroundColor: "#161616" }}
                icon={<LoginOutlined />}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
            <Button
              style={{ marginBottom: "10px", textAlign: "center", width: "100%" }}
              type="text"
              onClick={props.login}
            >
              没有账号?立即注册
            </Button>
            <Bottom />
          </Form>
        </div>
      </div>
      <div className="desc"></div>
    </Wrap>
  );
};

export default Login;
