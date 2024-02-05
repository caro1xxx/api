import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  font-size: 14px;
  font-family: "Helvetica";
  font-weight: lighter;
  padding: 0px 30px;
  color: #c3c3c3;
  > div {
    height: 40px;
    display: flex;
    align-items: center;
    text-align: start;
  }
  .delete {
    color: #ff3232;
  }
`;

type Props = {
  index: number;
  data: {
    key: number;
    name: string;
    out: string;
    rules: string;
    node: string;
    icon: string;
    delete: boolean;
  };
};

const RuleItem = (props: Props) => {
  return (
    <Wrap className="usenone" style={{ backgroundColor: props.index % 2 === 0 ? "#0f0f0f" : "#141414" }}>
      <div style={{ color: "#129a12ff" }}>#{props.data.key}</div>
      <div>{props.data.name}</div>
      <div>{props.data.node}</div>
      <div dangerouslySetInnerHTML={{ __html: props.data.icon }}></div>
      <div>{props.data.out}</div>
      <div>{props.data.rules}</div>
      {props.data.delete ? <div className="delete">删除</div> : <div>--</div>}
    </Wrap>
  );
};

export default RuleItem;
