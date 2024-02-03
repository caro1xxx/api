import styled from "styled-components";
import { Link } from "react-router-dom";
import { useReactive } from "ahooks";
import { useLocation } from "react-router-dom";

const Wrap = styled.div`
  padding-top: 10px;
  color: white;
  > a {
    text-decoration: none;
    margin-right: 15px;
    color: #9e9e9e;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.6s ease;
  }
  > a:hover {
    background: #40404059 !important;
  }
`;

type Props = {};

const SubBar = (props: Props) => {
  const location = useLocation();
  const state = useReactive({
    bar: [
      { path: "/", title: "概括" },
      { path: "/plan", title: "订阅&活动" },
      { path: "/status", title: "节点状态" },
    ],
  });
  return (
    <Wrap>
      {state.bar.map((item) => {
        return (
          <Link
            to={item.path}
            style={{ background: location.pathname === item.path ? "#40404059" : "#0c0b0c" }}
            key={item.path}
          >
            {item.title}
          </Link>
        );
      })}
    </Wrap>
  );
};

export default SubBar;
