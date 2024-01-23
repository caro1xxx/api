import styled from "styled-components";
import { Divider, Modal, Spin, message } from "antd";
import { useReactive, useRequest } from "ahooks";
import { AdvancedNode } from "../../api/user";
import ClipboardJS from "clipboard";
import Qr from "../mods/Qr";
import { useEffect } from "react";

const Wrap = styled.div`
  color: black;
  height: 600px;
  padding: 20px;
  overflow-y: scroll;
  user-select: none;
  @media screen and (max-width: 700px) {
    height: calc(100vh);
    padding-top: 80px;
  }
  .itemWrap {
    display: flex;
    align-items: center;
    @media screen and (max-width: 700px) {
      flex-wrap: wrap;
    }
  }
  .item {
    margin-right: 10px;
    cursor: pointer;
    border: 2px solid #cecece48;
    border-radius: 10px;
    padding: 10px;
    font-size: 20px;
    font-weight: bolder;
    transition: background 0.7s ease;
    @media screen and (max-width: 700px) {
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      background-size: cover;
      height: 40px;
      width: 40px;
      border-radius: 5px;
    }
  }
  .item:hover {
    background: #cecece70;
  }
`;

type Props = {};

const Links = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    base: [
      {
        icon: "https://pic.imgdb.cn/item/65a98bbe871b83018a81bdd5.png",
        name: "复制订阅地址",
        value: "",
        click: function () {},
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98c0f871b83018a822139.png",
        name: "扫码订阅",
        value: "",
        click: function () {
          state.showQr = true;
          state.subscription = `${state.subscription}&target=clash`;
        },
      },
    ],
    ios: [
      {
        icon: "https://pic.imgdb.cn/item/65a98ea8871b83018a855249.webp",
        name: "Shadowrocket",
        value: "",
        click: function () {
          window.open(`shadowrocket://add/${state.subscription}&target=clash&remark=ZOOM`);
        },
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98c61871b83018a828139.png",
        name: "Clash for Android",
        value: "",
        click: function () {
          window.open(`clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`);
        },
      },
    ],
    windows: [
      {
        icon: "https://pic.imgdb.cn/item/65a98c61871b83018a828139.png",
        name: "Clash for Windows",
        value: "",
        click: function () {
          window.open(`clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`);
        },
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98d55871b83018a83b6cc.webp",
        name: "v2rayN",
        value: "",
        click: function () {
          state.showQr = true;
        },
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98b3b871b83018a811611.png",
        name: "Shadowsocks",
        value: "",
        click: function () {
          state.showQr = true;
        },
      },
    ],
    macos: [
      {
        icon: "https://pic.imgdb.cn/item/65a9884e871b83018a7d6f39.webp",
        name: "ClashX",
        value: "",
        click: function () {
          window.open(`clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`);
        },
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98d8f871b83018a83fe11.png",
        name: "v2rayU",
        value: "",
        click: function () {},
      },
      {
        icon: "https://pic.imgdb.cn/item/65a98e31871b83018a84ce2e.png",
        name: "Surge Mac",
        value: "",
        click: function () {
          state.showQr = true;
        },
      },
    ],
    subscription: "",
    showQr: false,
  });
  const { loading } = useRequest(AdvancedNode, {
    cacheKey: "AdvancedNode",
    onSuccess: (result) => {
      if (result.code === 200) {
        state.subscription = result.data.convert;
      }
    },
  });

  useEffect(() => {
    const clipboard = new ClipboardJS("#linkbutton");
    clipboard.on("success", (e) => {
      messageApi.success("复制订阅链接成功");
      e.clearSelection();
    });
    return () => {
      clipboard.destroy();
    };
  }, [messageApi]);

  if (loading)
    return (
      <div style={{ height: "600px", width: "100%" }} className="center">
        <Spin />
      </div>
    );
  return (
    <Wrap>
      {contextHolder}
      <Divider orientation="left" orientationMargin={10}>
        订阅链接
      </Divider>
      <div className="itemWrap">
        {state.base.map((item) => {
          return item.name === "复制订阅地址" ? (
            <div
              className="item center"
              key={item.name}
              id="linkbutton"
              data-clipboard-text={`${state.subscription}&target=clash`}
            >
              <div className="img" style={{ backgroundImage: `url("${item.icon}")` }}></div>
              {item.name}
            </div>
          ) : (
            <div className="item center" key={item.name} onClick={item.click}>
              <div className="img" style={{ backgroundImage: `url("${item.icon}")` }}></div>
              {item.name}
            </div>
          );
        })}
      </div>
      <Divider orientation="left" orientationMargin={10}>
        一键导入(ios & android)
      </Divider>
      <div className="itemWrap">
        {state.ios.map((item) => {
          return (
            <div className="item center" key={item.name} onClick={item.click}>
              <div className="img" style={{ backgroundImage: `url("${item.icon}")` }}></div>
              {item.name}
            </div>
          );
        })}
      </div>
      <Divider orientation="left" orientationMargin={10}>
        一键导入(Windows)
      </Divider>
      <div className="itemWrap">
        {state.windows.map((item) => {
          return (
            <div className="item center" key={item.name} onClick={item.click}>
              <div className="img" style={{ backgroundImage: `url("${item.icon}")` }}></div>
              {item.name}
            </div>
          );
        })}
      </div>
      <Divider orientation="left" orientationMargin={10}>
        一键导入(MacOS)
      </Divider>
      <div className="itemWrap">
        {state.macos.map((item) => {
          return (
            <div className="item center" key={item.name} onClick={item.click}>
              <div className="img" style={{ backgroundImage: `url("${item.icon}")` }}></div>
              {item.name}
            </div>
          );
        })}
      </div>
      <Modal
        open={state.showQr}
        title={<></>}
        onCancel={() => {
          state.showQr = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"auto"}
        destroyOnClose={true}
        modalRender={(modal) => <Qr sub={state.subscription} />}
      />
    </Wrap>
  );
};

export default Links;
