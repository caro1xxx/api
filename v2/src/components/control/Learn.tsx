import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import styled from "styled-components";
import Ios from "./Learn/Ios";

const Wrap = styled.div`
  height: calc(100vh);
  overflow-y: scroll;
  color: black;
  padding: 10px 10px;
  overflow-y: scroll;
  user-select: none;
  position: relative;
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (panelStyle) => [
  {
    key: "1",
    label: "苹果使用教程",
    children: <Ios />,
    style: panelStyle,
  },
  {
    key: "2",
    label: "安卓使用教程",
    children: <p>编写中</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "Mac使用教程",
    children: <p>编写中</p>,
    style: panelStyle,
  },
  {
    key: "4",
    label: "Windows使用教程",
    children: <p>编写中</p>,
    style: panelStyle,
  },
];

const Learn = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Wrap>
      <Collapse
        bordered={false}
        defaultActiveKey={[]}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </Wrap>
  );
};

export default Learn;
