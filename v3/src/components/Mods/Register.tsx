import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { FieldType } from "../../types/state";
import { UserOutlined, UnlockOutlined, QrcodeOutlined, LoginOutlined } from "@ant-design/icons";
import { authRegister } from "../../api/user";
import { useAppDispatch } from "../../redux/hooks";
import { saveToken } from "../../redux/modules/user";
import { useLocation } from "react-router-dom";
import { useReactive } from "ahooks";

const Wrap = styled.div`
  background-color: #151515;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  pointer-events: auto;
  padding: 20px;
  color: white;
  .forminput {
    width: 300px;
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

const Register = (props: Props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    loading: false,
  });
  return (
    <Wrap>
      {contextHolder}
      <div className="forminput">
        <div className="logo">ZOOM Magic Network</div>
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
          name="register"
          style={{ paddingLeft: "10px", margin: "30px 0px" }}
          initialValues={{ remember: true, code: searchParams.get("aff") ? searchParams.get("aff") : "" }}
          onFinish={(e) => {
            authRegister(
              e.username,
              e.password,
              messageApi,
              props.close,
              (token: string) => {
                dispatch(saveToken(token));
              },
              state,
              e.code
            );
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType> name="username" rules={[{ type: "email", required: true, message: "请输入有效邮箱" }]}>
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
              { required: true, message: "请输入注册密码" },
              { min: 6, message: "密码长度6-14" },
            ]}
          >
            <Input.Password
              prefix={<UnlockOutlined style={{ color: "#cecece" }} />}
              maxLength={14}
              showCount
              placeholder="请输入注册密码"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请保证两次密码相同",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("请保证两次密码相同"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<UnlockOutlined style={{ color: "#cecece" }} />}
              maxLength={14}
              showCount
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item<FieldType> name="code" rules={[{ required: false }]}>
            <Input
              prefix={<QrcodeOutlined style={{ color: "#cecece" }} />}
              maxLength={6}
              showCount
              placeholder="邀请码(选填)"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={state.loading}
              style={{ width: "100%", backgroundColor: "#161616" }}
              icon={<LoginOutlined style={{ color: "#cecece" }} />}
              htmlType="submit"
            >
              注册
            </Button>
          </Form.Item>
          <Button style={{ marginBottom: "10px", textAlign: "center", width: "100%" }} onClick={props.login}>
            我有账号!需要登录
          </Button>
        </Form>
        <div className="usenone" style={{ textAlign: "center" }}>
          &copy; 2024 Zoommm. All rights reserved.
        </div>
      </div>
    </Wrap>
  );
};

export default Register;
