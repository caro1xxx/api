import { useReactive, useRequest } from "ahooks";
import styled from "styled-components";
import { Switch, Input, Divider, Spin, Progress } from "antd";
import { formatTimestamp, formatBytes, getCurrentTimeStamp } from "../../utils/tools";
import { Link } from "react-router-dom";
import { Profile } from "../../api/user";

const Wrap = styled.div`
  color: black;
  height: 600px;
  padding: 10px 20px;
  overflow-y: scroll;
  user-select: none;
  .item {
    line-height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.7s ease;
    .renewal {
      color: green;
      text-decoration: underline;
    }
    .expired {
      color: red;
    }
  }
  .item:hover {
    background: #e5e4e5;
  }
`;

type Props = {};

const General = (props: Props) => {
  const state = useReactive({
    subConfig: [
      {
        title: "订阅",
        value: "",
        type: "change",
      },
      {
        title: "订阅链接",
        value: "",
        type: "copy",
      },
      {
        title: "到期时间",
        value: 0,
        type: "date",
      },
      {
        title: "已使用/剩余流量",
        value: [0, 0],
        type: "flow",
      },
    ],
    baseConfig: [
      {
        title: "Zoom core 版本",
        value: "Zoom.010124",
        type: "text",
      },
      {
        title: "订阅启用",
        value: true,
        type: "switch",
      },
      {
        title: "允许多设备使用",
        value: false,
        type: "switch",
      },
      {
        title: "订阅到期邮件通知",
        value: true,
        type: "switch",
      },
      {
        title: "推送优惠活动邮件",
        value: true,
        type: "switch",
      },
      {
        title: "带宽限制",
        value: "无限速",
        type: "input",
      },
    ],
    advancedConfig: [
      {
        title: "云端规则",
        value: false,
        type: "switch",
      },
    ],
  });

  const { loading } = useRequest(Profile, {
    cacheKey: "profile",
    onSuccess: (result) => {
      if (result.code === 200) {
        state.subConfig[0].value = result.data.plan + "订阅";
        state.subConfig[1].value = result.data.subLink;
        state.subConfig[2].value = result.data.expireTime;
        // @ts-ignore
        state.subConfig[3].value[0] = result.data.used;
        // @ts-ignore
        state.subConfig[3].value[1] = result.data.remaining;
        state.baseConfig[1].value = result.data.system;
        state.baseConfig[2].value = result.data.concurrent;
        state.baseConfig[3].value = result.data.bascEmailNotify;
        state.baseConfig[4].value = result.data.marketingEmailNotify;
        state.baseConfig[5].value = result.data.rateLimit === 0 ? "无限制" : result.data.rateLimit;
        state.advancedConfig[0].value = result.data.cloudRules;
        if (result.data.reset !== "0" && result.data.reset !== 0) {
          state.subConfig.push({
            title: "下次流量重置日期",
            value: result.data.reset,
            type: "reset",
          });
        }
      }
    },
  });
  return (
    <Wrap>
      <Divider orientation="left" orientationMargin={10}>
        订阅
      </Divider>
      {state.subConfig.map((item) => {
        return (
          <div className="item" key={item.title}>
            <div>{item.title}</div>
            <div style={{ flex: 1 }}></div>
            {item.type === "date" ? (
              !loading ? (
                (item.value as number) > getCurrentTimeStamp() ? (
                  <div>{formatTimestamp(item.value as number)}</div>
                ) : (
                  <div className="expired">已过期</div>
                )
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "change" ? (
              !loading ? (
                (state.subConfig[2].value as number) > getCurrentTimeStamp() ? (
                  <div>
                    {item.value} <span className="renewal">续费</span>
                  </div>
                ) : (
                  <div className="expired">
                    已到期 <span className="renewal">去订阅</span>
                  </div>
                )
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "copy" ? (
              !loading ? (
                <Link to={"/sub/link"}>
                  <span className="renewal">查看</span>
                </Link>
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "reset" ? (
              !loading ? (
                <div>{item.value}</div>
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : !loading ? (
              (state.subConfig[2].value as number) > getCurrentTimeStamp() ? (
                item.title === "已使用/剩余流量" && (item.value as number[])[1] < 0 ? (
                  <div className="expired">
                    {formatBytes((item.value as number[])[0])}
                    流量已用尽 <span className="renewal">重置流量</span>
                  </div>
                ) : (
                  <div>
                    <div>
                      <Progress
                        showInfo={false}
                        percent={
                          ((item.value as number[])[0] / ((item.value as number[])[0] + (item.value as number[])[1])) *
                          100
                        }
                        size="small"
                      />
                    </div>
                    {formatBytes((item.value as number[])[0] as number)}
                    <span> / </span>
                    {formatBytes((item.value as number[])[1] as number)}
                  </div>
                )
              ) : (
                <div className="expired">已过期</div>
              )
            ) : (
              <div>
                <Spin />
              </div>
            )}
          </div>
        );
      })}
      <Divider orientation="left" orientationMargin={10}>
        基本
      </Divider>
      {state.baseConfig.map((item) => {
        return (
          <div className="item" key={item.title}>
            <div>{item.title}</div>
            <div style={{ flex: 1 }}></div>
            {item.type === "text" ? (
              !loading ? (
                <div>{item.value}</div>
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "switch" ? (
              !loading ? (
                <Switch defaultChecked={item.value as boolean} onChange={() => (item.value = !item.value)} />
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "input" ? (
              !loading ? (
                <Input
                  style={{ width: "100px" }}
                  value={item.value as string}
                  onChange={(e) => (item.value = e.target.value)}
                />
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : null}
          </div>
        );
      })}
      <Divider orientation="left" orientationMargin={10}>
        高级
      </Divider>
      {state.advancedConfig.map((item) => {
        return (
          <div className="item" key={item.title}>
            <div>{item.title}</div>
            <div style={{ flex: 1 }}></div>
            {item.type === "text" ? (
              <div>{item.value}</div>
            ) : (
              <Switch defaultChecked={item.value as boolean} onChange={() => (item.value = !item.value)} />
            )}
          </div>
        );
      })}
    </Wrap>
  );
};

export default General;
