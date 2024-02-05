import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { FieldType } from "../../types/state";
import { UserOutlined, UnlockOutlined, LoginOutlined } from "@ant-design/icons";
import { authLogin } from "../../api/user";
import { useAppDispatch } from "../../redux/hooks";
import { saveToken } from "../../redux/modules/user";
import { useReactive } from "ahooks";

const Wrap = styled.div`
  background-color: #151515;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  pointer-events: auto;
  padding: 20px;
  color: white;
  .forminput {
    margin: 0 auto;
    .logo {
      user-select: none;
      cursor: pointer;
      margin-left: 10px;
      height: 40px;
      font-size: 40px;
      font-family: "Bungler";
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
  const state = useReactive({ loading: false });
  return (
    <Wrap>
      {contextHolder}
      <div className="forminput">
        <div className="logo">ZOOM Magic NETWORK</div>
        <div
          className="usenone"
          style={{
            fontFamily: "Helvetica",
            color: "#858585",
            fontSize: "15px",
            marginTop: "10px",
            marginLeft: "10px",
            fontWeight: "lighter",
          }}
        >
          助您到达全球任意角落 网络有价 自由无价
        </div>
        <Form
          name="login"
          style={{ paddingLeft: "10px", margin: "30px 0px" }}
          initialValues={{ remember: true }}
          onFinish={(e) => {
            authLogin(
              e.username,
              e.password,
              messageApi,
              props.close,
              (token: string) => {
                dispatch(saveToken(token));
              },
              state
            );
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType> name="username" rules={[{ type: "email", required: true, message: "请输入有效邮箱" }]}>
            <Input
              prefix={<UserOutlined style={{ color: "#cecece" }} />}
              placeholder="请输入登录邮箱"
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
              loading={state.loading}
              style={{ width: "100%", backgroundColor: "#161616" }}
              icon={<LoginOutlined />}
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
          <Button style={{ marginBottom: "10px", textAlign: "center", width: "100%" }} onClick={props.login}>
            没有账号?立即注册
          </Button>
        </Form>
      </div>
      <div className="usenone" style={{ textAlign: "center" }}>
        &copy; 2024 Zoommm. All rights reserved.
      </div>
    </Wrap>
  );
};

export default Login;
