import styled from "styled-components";

const Wrap = styled.div`
  background-color: #0d0c0d;
  color: white;
  height: 70px;
  .logo {
    font-size: 35px;
    font-family: "Bungler";
    letter-spacing: 2px;
  }
  .user {
    height: 48px;
    width: 150px;
    background-color: #1f1f1f;
    border-radius: 30px;
    padding: 0px 5px;
    .avator {
      width: 35px;
      height: 35px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
`;

type Props = {};

const NavBar = (props: Props) => {
  return (
    <Wrap className="center">
      <div className="logo">ZOOMCloud</div>
      <div style={{ flex: 1 }}></div>
      <div className="user center">
        <div className="avator"></div>
        <div style={{ flex: 1 }}></div>
      </div>
    </Wrap>
  );
};

export default NavBar;
