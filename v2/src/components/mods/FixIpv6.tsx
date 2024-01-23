import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  background-color: white;
  border-radius: 10px;
  pointer-events: auto;
  overflow: hidden;
  padding: 20px;
  height: 300px;
  width: 500px;
  background-image: url("https://pic.imgdb.cn/item/65aec956871b83018af6abaa.webp");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  .title {
    user-select: none;
    text-align: center;
    color: #71a393;
    font-size: 35px;
    font-family: "Joyfont-ZeusGB-Flash";
    > span {
      font-size: 45px;
      font-family: "Bungler";
    }
  }
`;

type Props = {};

const FixIpv6 = (props: Props) => {
  return (
    <Wrap>
      <div className="title">
        抱歉!您的网络状态不支持<span>ZOOM</span>
      </div>
      <div style={{ flex: 1 }}></div>
      <div className="center">
        <div style={{ flex: 1 }}></div>
        <Link to={"/"} style={{ marginRight: "10px" }}>
          返回主页
        </Link>
        <Link to={"fix"}>修复网络</Link>
      </div>
    </Wrap>
  );
};

export default FixIpv6;
