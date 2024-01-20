import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Drawer, ConfigProvider, Popover } from "antd";
import { useReactive } from "ahooks";
import Register from "./Register";
import Login from "./Login";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { getStorage } from "../utils/tools";
import { saveToken } from "../redux/modules/user";
import ControlBar from "./ControlBar";

const Wrap = styled.div`
  background-color: rgba(0, 136, 66, 0.1);
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 70px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  .body {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1220px) {
      width: calc(100vw);
      padding: 0px 10px;
    }
    .logo {
      font-size: 30px;
      font-weight: bolder;
      background-image: url("https://pic.imgdb.cn/item/65a62235871b83018afa72a8.png");
      height: 40px;
      width: 140px;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .barItem {
      text-decoration: none;
      color: white;
      margin: 0px 10px;
      font-size: 17px;
      font-weight: bolder;
    }
    @media screen and (max-width: 500px) {
      .barItem {
        display: none;
      }
    }
    .user {
      display: flex;
      align-items: center;
      margin-left: 20px;
      > button {
        margin-left: 10px;
      }
    }
  }
`;

type Props = {};

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const state = useReactive({
    showLogin: false,
    showRegister: false,
    authHeight: 90,
  });

  useEffect(() => {
    if (getStorage("token")) {
      dispatch(saveToken(getStorage("token")));
    }
    if (window.innerWidth <= 530) {
      state.authHeight = 70;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrap>
      <div className="body">
        <Link className="logo" to={"/"}></Link>
        <div style={{ flex: 1 }}></div>
        <Link to={"/"} className="barItem">
          主页
        </Link>
        <Link to={"/plan"} className="barItem">
          订阅
        </Link>
        <Link to={"/about"} className="barItem">
          关于
        </Link>
        {token ? (
          <div className="user">
            <Popover placement="topLeft" title={null} content={<ControlBar />}>
              <Button style={{ color: "white", fontWeight: "bolder" }} type="text">
                控制台
              </Button>
            </Popover>

            <Button
              style={{ backgroundColor: "#ff48482e" }}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              danger
            >
              登出
            </Button>
          </div>
        ) : (
          <div className="user">
            <Button type="primary" onClick={() => (state.showLogin = true)}>
              登录
            </Button>
            <Button onClick={() => (state.showRegister = true)}>注册</Button>
          </div>
        )}
      </div>
      <ConfigProvider
        theme={{
          token: {
            paddingLG: 0,
          },
        }}
      >
        <Drawer
          title={null}
          placement={"bottom"}
          onClose={() => (state.showRegister = false)}
          open={state.showRegister}
          height={"90%"}
          footer={null}
          closeIcon={false}
        >
          <Register
            close={() => {
              state.showRegister = false;
            }}
            login={() => {
              state.showLogin = true;
              state.showRegister = false;
            }}
          />
        </Drawer>
        <Drawer
          title={null}
          placement={"bottom"}
          onClose={() => (state.showLogin = false)}
          open={state.showLogin}
          height={"90%"}
          footer={null}
          closeIcon={false}
        >
          <Login
            login={() => {
              state.showLogin = false;
              state.showRegister = true;
            }}
            close={() => {
              state.showLogin = false;
            }}
          />
        </Drawer>
      </ConfigProvider>
    </Wrap>
  );
};

export default NavBar;
