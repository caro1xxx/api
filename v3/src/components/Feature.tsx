import styled from "styled-components";

const Wrap = styled.div`
  margin-top: 30px;
  height: 200px;
  .panel {
    background-image: url("https://pic.imgdb.cn/item/65bfc455c458853aef9bbcb1.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 49.3%;
    height: 100%;
    background-color: #64a2ff7a;
    border-radius: 10px;
  }
`;

type Props = {};

const Feature = (props: Props) => {
  return (
    <Wrap className="center">
      <div className="panel"></div>
      <div style={{ flex: 1 }}></div>
      <div
        className="panel"
        style={{
          backgroundImage: `url("https://pic.imgdb.cn/item/65bfc6c5c458853aefa508f8.png")`,
          backgroundColor: "#ff3c80",
        }}
      ></div>
    </Wrap>
  );
};

export default Feature;
