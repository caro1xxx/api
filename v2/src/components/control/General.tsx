import { useReactive, useRequest } from "ahooks";
import styled from "styled-components";
import { Switch, Input, Divider, Spin, Progress } from "antd";
import { formatTimestamp, formatBytes, getCurrentTimeStamp } from "../../utils/tools";
import { Link } from "react-router-dom";
import { Profile } from "../../api/user";
import { useRef } from "react";

const Wrap = styled.div`
  height: calc(100vh);
  overflow-y: scroll;
  color: black;
  padding: 10px 20px;
  overflow-y: scroll;
  user-select: none;
  position: relative;
  .bar {
    position: -webkit-sticky;
    position: sticky;
    top: -10px;
    z-index: 1;
    height: 40px;
    background-color: #fff;
  }

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

type Props = {
  close: () => void;
};

const General = (props: Props) => {
  const scrollContainerRef = useRef(null);
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
    sublink: [
      {
        title: "手动导入",
        value: "https://github.com/cfwtf/clash_for_windows/releases",
        type: "copy",
      },
      {
        title: "扫码导入",
        value: "https://github.com/cfwtf/clash_for_windows/releases",
        type: "qr",
      },
      {
        title: "Clash(window)",
        value: "https://github.com/cfwtf/clash_for_windows/releases",
        type: "app",
      },
      {
        title: "V2rayU(Mac)",
        value: "https://github.com/yanue/V2rayU/releases",
        type: "app",
      },
      {
        title: "Clash(Android)",
        value: "https://dl.clashforandroid.org/releases/latest/cfa-2.5.12-premium-universal-release.apk",
        type: "app",
      },
      {
        title: "Shadowrocket(IOS)",
        value: "https://apps.apple.com/us/app/shadowrocket/id932747118",
        type: "app",
      },
      {
        title: "Surge(Mac)",
        value: "https://apps.apple.com/us/app/surge-5/id1442620678",
        type: "app",
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

  const scrollToBottom = () => {
    // @ts-ignore
    scrollContainerRef.current!.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <Wrap>
      <Divider className="bar" orientation="left" orientationMargin={10}>
        <div className="center">
          <svg
            onClick={props.close}
            style={{ marginRight: "10px", cursor: "pointer" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3129"
            width="25"
            height="25"
          >
            <path
              d="M511.213557 65.37494c-245.875761 0-445.212719 199.317535-445.212719 445.184245s199.336958 445.184245 445.212719 445.184245c245.898275 0 445.222953-199.316511 445.222953-445.184245S757.111832 65.37494 511.213557 65.37494zM511.236071 911.129326c-220.774055 0-400.391095-180.345438-400.391095-400.919089 0-220.570581 179.61704-400.004253 400.391095-400.004253 220.776102 0 400.391095 179.433672 400.391095 400.004253C911.627165 730.783889 732.012172 911.129326 511.236071 911.129326zM711.648568 488.437351 348.187037 488.437351l132.332216-141.90494c8.681062-8.691963 8.681062-22.772656 0-31.465642-8.703576-8.692986-22.786893-8.692986-31.467955 0L267.533901 511.168052l178.72468 197.47149c4.356393 4.347005 10.049279 6.541997 15.733977 6.541997 5.692886 0 11.387818-2.194992 15.733977-6.541997 8.694366-8.67252 8.694366-22.750143 0-31.469736l-130.961953-144.224776 364.885008 0c12.290411 0 22.254752-9.954723 22.254752-22.255887C733.90332 498.410494 723.937956 488.437351 711.648568 488.437351z"
              fill="#272636"
              p-id="3130"
            ></path>
          </svg>
          订阅
        </div>
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
                    {item.value}{" "}
                    <Link to={"/plan"} className="renewal">
                      续费
                    </Link>
                  </div>
                ) : (
                  <div className="expired">
                    已到期{" "}
                    <Link to={"/plan"} className="renewal">
                      去订阅
                    </Link>
                  </div>
                )
              ) : (
                <div>
                  <Spin />
                </div>
              )
            ) : item.type === "copy" ? (
              !loading ? (
                <div onClick={scrollToBottom}>
                  <span className="renewal">查看</span>
                </div>
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
      <Divider orientation="left" orientationMargin={10}>
        订阅链接<span style={{ fontSize: "10px" }}>(请注意ZOOM 仅支持双栈代理软件)</span>
      </Divider>
      {state.sublink.map((item) => {
        return (
          <div className="item" key={item.title}>
            <div>{item.title}</div>
            <div style={{ flex: 1 }}></div>
            {item.type === "app" ? (
              <>
                <div style={{ color: "green", marginRight: "10px" }}>导入订阅</div>
                <Link to={item.value} target="_blank">
                  下载软件
                </Link>
              </>
            ) : item.type === "copy" ? (
              <div style={{ color: "green" }}>复制</div>
            ) : (
              <div style={{ color: "green" }}>扫码</div>
            )}
          </div>
        );
      })}
      <div ref={scrollContainerRef}></div>
      <div style={{ fontSize: "10px", textAlign: "center", marginTop: "20px" }}>ZOOM Panel version 0.1.14</div>
    </Wrap>
  );
};

export default General;
