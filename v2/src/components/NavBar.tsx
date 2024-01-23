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
import General from "./control/General";
import Rules from "./control/Rules";
import Share from "./control/Share";

const Wrap = styled.div`
  user-select: none;
  position: fixed;
  top: 0;
  z-index: 3;
  width: calc(100vw);
  height: 110px;
  line-height: 70px;
  font-weight: bolder;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  .activte {
    line-height: 40px;
    text-align: center;
    height: 40px;
    background-color: black;
    color: white;
    @media screen and (max-width: 415px) {
      > span {
        display: none;
      }
    }
    > a {
      color: #ffcc00;
      font-weight: bolder;
      text-decoration: underline;
      font-style: italic;
      cursor: pointer;
    }
  }
  .body {
    width: 1200px;
    margin: 0 auto;
    @media screen and (max-width: 1220px) {
      width: calc(100vw);
      padding: 0px 10px;
    }
    .logo {
      font-family: "Bungler";
      font-size: 40px;
      text-decoration: none;
      color: #2c2c2c;
    }
    .barItem {
      text-decoration: none;
      margin: 0px 5px;
      font-weight: bolder;
      @media screen and (max-width: 500px) {
        display: none;
      }
      > button {
        font-weight: bolder;
        font-size: 15px;
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
    showContral: false,
    contral: "",
    openContralBar: false,
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
      <div className="activte">
        新春特惠提前開售 <span>全場通用 -15%</span> 折扣碼‘‘zoom66’’ <Link to={"/plan"}>前往</Link>
      </div>
      <div className="body center">
        <Link to={"/"} className="logo">
          ZOOM
        </Link>
        <div style={{ flex: 1 }}></div>
        <Link to={"/"} className="barItem">
          <Button type="text">首页</Button>
        </Link>
        <Link to={"/plan"} className="barItem">
          <Button type="text">订阅</Button>
        </Link>
        <Link to={"/status"} className="barItem">
          <Button type="text">状态</Button>
        </Link>
        {token ? (
          <div className="user">
            <Popover
              placement="topLeft"
              title={null}
              trigger={["click"]}
              open={state.openContralBar}
              onOpenChange={() => (state.openContralBar = !state.openContralBar)}
              content={
                <ControlBar
                  selectContral={(bar: string) => {
                    state.contral = bar;
                    state.showContral = true;
                    state.openContralBar = false;
                  }}
                />
              }
            >
              <Button style={{ fontWeight: "bolder", marginRight: "10px" }} type="text">
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
            <Button type="primary" onClick={() => (state.showLogin = true)} style={{ marginRight: "10px" }}>
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
        <Drawer
          title={null}
          placement={"right"}
          onClose={() => (state.showContral = false)}
          open={state.showContral}
          height={"90%"}
          footer={null}
          closeIcon={false}
        >
          {state.contral === "sub" ? (
            <General
              close={() => {
                state.showContral = false;
              }}
            />
          ) : state.contral === "ruls" ? (
            <Rules />
          ) : state.contral === "share" ? (
            <Share />
          ) : null}
        </Drawer>
      </ConfigProvider>
    </Wrap>
  );
};

export default NavBar;
