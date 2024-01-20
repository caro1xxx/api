import styled from "styled-components";
import { Divider, Input, Space, Button, Spin, Empty, message, Modal } from "antd";
import { useReactive, useRequest } from "ahooks";
import { formatTimestamp } from "../../utils/tools";
import { inviteList } from "../../api/user";
import { HOST } from "../../utils/env";
import ClipboardJS from "clipboard";
import { useEffect } from "react";
import Withdraw from "../mods/Withdraw";

const Wrap = styled.div`
  color: black;
  height: 600px;
  padding: 10px 20px;
  overflow-y: scroll;
  user-select: none;
  .item {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    line-height: 25px;
    transition: background 0.7s ease;
    .renewal {
      color: green;
      text-decoration: underline;
    }
  }
  .item:hover {
    background: #e5e4e5;
  }
  .inviteItem {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr repeat(2, 2fr) repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;
    > div {
      text-align: center;
      font-size: 15px;
      color: #777777;
    }
  }
`;

type Props = {};

const Share = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    showWithdraw: false,
    info: [
      {
        title: "分享链接",
        type: "link",
        value: "http://192.168.31.80/sub/share",
      },
      {
        title: "返现比例",
        type: "parcent",
        value: "20%",
      },
      {
        title: "已注册",
        type: "text",
        value: 0,
      },
      {
        title: "已订阅",
        type: "text",
        value: 0,
      },
      {
        title: "佣金",
        type: "btn",
        value: "0",
      },
    ],
    inviteList: [{ user: "caro1xxx@gmail.com", createTime: 1705474082, isSub: false, get: 0 }],
  });
  const { data, loading } = useRequest(inviteList, {
    cacheKey: "invite",
    onSuccess: (result) => {
      if (result.code === 200) {
        state.info[0].value = `${HOST}?aff=${result.shareCode}`;
        state.info[2].value = result.sumInvite;
        state.info[3].value = result.sumSub;
        state.info[4].value = result.balance;
      }
    },
  });

  useEffect(() => {
    const clipboard = new ClipboardJS("#share");
    clipboard.on("success", (e) => {
      messageApi.success("复制分享链接成功");
      e.clearSelection();
    });
    return () => {
      clipboard.destroy();
    };
  }, [messageApi]);
  return (
    <Wrap>
      {contextHolder}
      <Divider orientation="left" orientationMargin={10}>
        邀请设置
      </Divider>
      {state.info.map((item) => {
        return (
          <div key={item.title} className="item">
            {item.type === "link" ? (
              <Space.Compact style={{ width: "100%" }}>
                <Input value={item.value} />
                <Button type="primary" id="share" data-clipboard-text={item.value}>
                  复制分享
                </Button>
              </Space.Compact>
            ) : item.type === "text" ? (
              <div className="center">
                <div>{item.title}</div>
                <div style={{ flex: 1 }}></div>
                {!loading ? (
                  <div>{item.value}人</div>
                ) : (
                  <div>
                    <Spin />
                  </div>
                )}
              </div>
            ) : item.type === "parcent" ? (
              <div className="center">
                <div>{item.title}</div>
                <div style={{ flex: 1 }}></div>
                {!loading ? <div>{item.value}</div> : <Spin />}
              </div>
            ) : (
              <div className="center">
                <div>{item.title}</div>
                <div style={{ flex: 1 }}></div>
                <div>{!loading ? `￥${item.value}` : <Spin />}</div>
                <Button size="small" style={{ marginLeft: "10px" }} onClick={() => (state.showWithdraw = true)}>
                  提现
                </Button>
                <Button size="small" type="primary" style={{ marginLeft: "10px" }}>
                  兑换
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <Divider orientation="left" orientationMargin={10}>
        邀请记录
      </Divider>
      {loading ? (
        <div className="center">
          <Spin />
        </div>
      ) : data.code === 200 && data.data.length > 0 ? (
        data.data.map(
          (item: { commission: string; invite: string; inviteTime: number; subscription: boolean }, index: number) => {
            return (
              <div key={item.invite} className="inviteItem">
                <div>#{index + 1}</div>
                <div>{item.invite.split("@")[0]}@***.com</div>
                <div>{formatTimestamp(item.inviteTime)}</div>
                <div>{item.subscription ? "已订阅" : "未订阅"}</div>
                <div>￥{item.commission}</div>
              </div>
            );
          }
        )
      ) : (
        <div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无邀请"} />
        </div>
      )}
      <Modal
        open={state.showWithdraw}
        title={<></>}
        onCancel={() => {
          state.showWithdraw = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"300px"}
        destroyOnClose={true}
        modalRender={(modal) => <Withdraw balance={state.info[4].value + ""} />}
      />
    </Wrap>
  );
};

export default Share;
