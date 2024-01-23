import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Wrap = styled.div`
  background-image: url("https://pic.imgdb.cn/item/65a7515f871b83018a63a9b1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: calc(100vh);
  width: calc(100vw);
  .body {
    color: #161616;
    background-color: #ffffff;
    width: 1000px;
    margin: 0 auto;
    height: 600px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    @media screen and (max-width: 700px) {
      border-radius: 0px;
      height: calc(100vh);
    }
    .bar {
      background-color: #c0c0c068;
      width: 200px;
      height: 100%;
      display: flex;
      flex-flow: column;
      border-radius: 10px 0px 0px 10px;
      @media screen and (max-width: 700px) {
        display: none;
      }
      .item {
        display: block;
        text-decoration: none;
        color: #161616;
        user-select: none;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        padding: 15px 0px;
        transition: background 1s ease;
      }
      .item:hover {
        background-color: #fff;
      }
      .logo {
        background-image: url("https://pic.imgdb.cn/item/65a62235871b83018afa72a8.png");
        height: 40px;
        width: 140px;
        background-repeat: no-repeat;
        background-size: 100%;
      }
    }
  }
`;

type Props = {};

const Sub = (props: Props) => {
  const location = useLocation();

  return (
    <Wrap className="center">
      <div className="body center">
        <div className="bar">
          <div className="center" style={{ marginBottom: "20px", padding: "20px" }}>
            <div className="logo"></div>
          </div>
          <Link
            to={"/sub/general"}
            style={{ backgroundColor: location.pathname === "/sub/general" ? "#fff" : "rgba(0,0,0,0)" }}
            className="item"
          >
            通用
          </Link>
          <Link
            to={"/sub/rules"}
            style={{ backgroundColor: location.pathname === "/sub/rules" ? "#fff" : "rgba(0,0,0,0)" }}
            className="item"
          >
            云端规则
          </Link>
          <Link
            to={"/sub/link"}
            style={{ backgroundColor: location.pathname === "/sub/link" ? "#fff" : "rgba(0,0,0,0)" }}
            className="item"
          >
            订阅
          </Link>
          <Link
            to={"/sub/share"}
            style={{ backgroundColor: location.pathname === "/sub/share" ? "#fff" : "rgba(0,0,0,0)" }}
            className="item"
          >
            邀请
          </Link>
          <div style={{ flex: 1 }}></div>
          <div style={{ fontSize: "10px", marginBottom: "10px", textAlign: "center", color: "#696969" }}>
            Zoommm. All rights reserved.
          </div>
        </div>
        <div style={{ flex: 1, borderRadius: "0px 10px 10px 0px", overflow: "hidden" }}>
          <Outlet></Outlet>
        </div>
      </div>
    </Wrap>
  );
};

export default Sub;
