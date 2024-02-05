import { useReactive, useRequest } from "ahooks";
import styled from "styled-components";
import { Profile } from "../api/user";
import { formatTimestamp, formatBytes, getCurrentTimeStamp } from "../utils/tools";
import { Progress, Divider, Switch, Input, message, Modal, Spin } from "antd";
import { Link } from "react-router-dom";
import ClipboardJS from "clipboard";
import { useEffect } from "react";
import Qr from "../components/Mods/Qr";
import RuleItem from "../components/RuleItem";

const Wrap = styled.div`
  width: 1400px;
  padding-top: 100px;
  margin: 0 auto;
  .profile {
    width: 25%;
    border-radius: 5px;
    background-color: #141414;
    padding: 0px 20px 20px 20px;
    .title {
      color: #cecece;
      font-size: 15px;
    }
    .item {
      margin-top: 10px;
      font-size: 13px;
      color: #cecece;
      min-height: 25px;
    }
    a {
      text-decoration: none;
    }
  }
  .panel {
    background-color: #141414;
    border-radius: 5px;
    overflow-y: hidden;
    .ruleTitle {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      color: #5fa057;
      svg {
        margin-right: 10px;
      }
    }
    .header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      font-size: 14px;
      background-color: #0f0f0f;
      line-height: 40px;
      padding: 0px 30px;
      color: #919191;
      > div {
        text-align: start;
      }
    }
    .add {
      background-color: #141414;
      height: 40px;
      color: #5fa057;
      transition: opacity 0.5s ease;
    }
    .add:hover {
      opacity: 0.5;
    }
  }
  .share {
    margin-top: 20px;
    background-color: #141414;
    border-radius: 5px;
    overflow-y: hidden;
    .title {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      color: #5fa057;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

type Props = {};

const DashBoard = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    showQr: false,
    plan: "",
    expireTime: 0,
    used: 0,
    remaining: 0,
    version: "Zoom.020524",
    system: false,
    concurrent: false,
    bascEmailNotify: false,
    marketingEmailNotify: false,
    rateLimit: "无限制",
    subscription: "",
    cloudRules: false,
    reset: "",
  });
  const { loading } = useRequest(Profile, {
    cacheKey: "profile",
    onSuccess: (result) => {
      if (result.code === 200) {
        state.plan = result.data.plan + "订阅";
        state.expireTime = result.data.expireTime;
        state.used = result.data.used;
        state.remaining = result.data.remaining;
        state.system = result.data.system;
        state.concurrent = result.data.concurrent;
        state.bascEmailNotify = result.data.bascEmailNotify;
        state.marketingEmailNotify = result.data.marketingEmailNotify;
        state.rateLimit = result.data.rateLimit === 0 ? "无限制" : result.data.rateLimit;
        state.subscription = result.data.subLink;
        state.cloudRules = result.data.cloudRules;
        if (result.data.reset !== "0" && result.data.reset !== 0) {
          state.reset = result.data.reset === "no_reset" ? "无重置" : "每月";
        }
      }
    },
  });
  const data = [
    {
      key: 1,
      name: "国内定向",
      out: "netflix.com",
      rules: "geosite:cn",
      node: "香港02",
      icon: `<svg t="1707123705580" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7462" width="20" height="20"><path d="M924.5 338.9c-22.5-53.2-54.7-101-95.7-142s-88.8-73.2-142-95.7c-55.1-23.3-113.6-35.1-173.9-35.1-60.3 0-118.8 11.8-173.9 35.1-53.2 22.5-101 54.7-142 95.7s-73.2 88.8-95.7 142C77.9 394 66.1 452.5 66.1 512.8c0 60.3 11.8 118.8 35.1 173.9 22.5 53.2 54.7 101 95.7 142s88.8 73.2 142 95.7c55.1 23.3 113.6 35.1 173.9 35.1 60.3 0 118.8-11.8 173.9-35.1 53.2-22.5 101-54.7 142-95.7s73.2-88.8 95.7-142c23.3-55.1 35.1-113.6 35.1-173.9 0.1-60.3-11.7-118.8-35-173.9zM130.1 512.8c0-102.2 39.8-198.3 112.1-270.6 72.3-72.3 168.4-112.1 270.6-112.1 89.8 0 174.9 30.7 243.3 87.3L217.4 756.2c-56.5-68.4-87.3-153.5-87.3-243.4z m653.4 270.7c-72.3 72.3-168.4 112.1-270.6 112.1-93.1 0-181.2-33-250.8-93.6L802 262.1c60.5 69.6 93.6 157.6 93.6 250.8 0 102.2-39.8 198.3-112.1 270.6z" p-id="7463" fill="#d81e06"></path></svg>`,
      delete: false,
    },
    {
      key: 2,
      name: "国内定向",
      out: "netflix.com",
      rules: "geosite:cn",
      node: "香港02",
      icon: `<svg t="1707123951422" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8843" width="20" height="20"><path d="M354.8 497.7l9.4-12.3 15.5 0.7-8.8-12.8 5.6-14.5-15 4.5-12.1-9.8-0.3 15.5-13 8.5 14.6 5.2zM494.9 378.1l9.4-12.4 15.6 0.8-8.9-12.8 5.5-14.5-14.8 4.4-12.1-9.7-0.4 15.5-13 8.5 14.7 5.2zM447.9 629.3l-14.8 4.4-12.2-9.6-0.3 15.5-12.9 8.6 14.7 5.1 4.2 14.9 9.3-12.4 15.5 0.7-8.9-12.7zM631.5 614.2l-14.8 4.5-12.2-9.7-0.3 15.6-12.9 8.5 14.6 5.1 4.2 15 9.3-12.4 15.6 0.7-8.9-12.7z" fill="#DE2910" p-id="8844"></path><path d="M512 67c-245.8 0-445 199.2-445 445s199.2 445 445 445 445-199.2 445-445-199.2-445-445-445z m-6.6 197.4c23.6-11 48-14.5 71-11.6-1.3 0.5-2.6 0.8-3.9 1.3-21.7 10.1-31.3 35.8-21.2 57.3 1.6 3.4 5.4 8.9 7.9 14.8 14.2 34-0.5 73.3-33.8 89.6-0.4 0.2-3.5 1.9-4.5 2.7-26.2 13.6-37.4 45.5-24.8 72.5 1.9 4.2 4.4 7.9 7.2 11.3-9.8-7.8-19.5-20-25.5-32.7-14.5-31.2-8.2-74.4 6.8-95.1l-3.6-2.6c-15.8 21.8-22.4 67-7.2 99.7 6.5 14 17 26.7 27.9 34.9-28.7-12.6-53.1-35.1-67.4-65.7-31-66.9 4.3-145.3 71.1-176.4zM286.1 369.7c0 1.3-0.1 2.7 0.1 4 2.9 23.9 24.3 40.9 47.8 38.1 3.7-0.4 10.1-2.4 16.5-2.9 36.7-2.9 69.5 23.3 74.7 60 0 0.5 0.6 3.9 1.1 5 4.8 29.2 31.6 49.8 61.2 46.2 4.4-0.6 8.6-1.7 12.7-3.2-10.5 6.8-24.8 12.1-38.7 13.8-34.2 4.1-73.2-15.4-88.3-36.1l-3.6 2.6c15.8 21.7 56.7 42.2 92.4 37.9 15.3-1.8 30.5-7.8 41.7-15.5-20.9 23.2-49.9 39.4-83.3 43.4-73.1 8.7-136.7-49.2-145.4-122.3-3.1-25.8 1.2-50 11.1-71z m247.6 244.1C519.9 686.1 445.5 729.1 373.1 715.4c-25.6-4.9-47.5-16.3-64.4-32.1 1.3 0.4 2.5 0.9 3.9 1.2 23.6 4.5 46.3-10.8 50.7-34.1 0.7-3.7 0.7-10.4 2.2-16.6 8.3-35.9 43.3-59.2 79.8-53 0.5 0.1 3.9 0.5 5.2 0.5 29.2 4.3 56.9-15 62.5-44.3 0.8-4.3 1-8.6 0.8-12.8 3.2 12 4 27.2 1.4 40.8-6.4 33.8-36.8 65.2-61.1 73.3l1.4 4.2c25.5-8.5 57.4-41.3 64.1-76.7 2.9-15.2 1.7-31.6-2.3-44.6 16 26.8 22.7 59.4 16.4 92.6z m129.5 93.2c-12.6 22.8-30.2 40-50.6 51.3 0.7-1.1 1.6-2.1 2.3-3.3 11.6-21 4.1-47.4-16.6-58.8-3.3-1.8-9.6-4-15.1-7.3-31.5-19.1-42.9-59.6-25.7-92.3 0.2-0.4 1.7-3.6 2.1-4.7 13.2-26.5 3.4-58.8-22.7-73.3-3.9-2.1-7.9-3.6-12-4.8 12.5 0.6 27.2 4.6 39.3 11.3 30.1 16.6 50.5 55.3 50.6 80.9h4.4c-0.1-26.9-21.4-67.3-52.9-84.7-13.6-7.5-29.6-11.5-43.2-11.7 30.6-6.8 63.7-3.1 93.3 13.2 64.6 35.5 82.3 119.6 46.8 184.2z m112.6-218.1c-16.4-17.5-43.8-18.5-61-2.3-2.7 2.6-6.7 7.9-11.6 12.2-27.8 24.1-69.9 22.4-95.7-4.1-0.3-0.3-2.9-2.7-3.9-3.4-21.1-20.7-54.9-21.4-76.7-1-3.3 3.1-6 6.5-8.3 10.2 4.4-11.8 12.8-24.7 23-34.2 25.1-23.5 68.1-31 92.5-23.2l1.3-4.3c-25.6-8.2-70.6-0.4-96.9 24.2-11.1 10.4-19.8 24.1-24.4 36.8 3.1-30.9 16.9-61 41.4-84 53.7-50.4 139.2-41.3 189.6 12.4 17.8 19 28.8 41.1 33.2 63.9-0.9-1.1-1.5-2.2-2.5-3.2z" fill="#DE2910" p-id="8845"></path><path d="M674.2 434.9l-14.9 4.5-12.2-9.7-0.2 15.5-13 8.5 14.6 5.2 4.2 14.9 9.4-12.3 15.5 0.7-8.9-12.8z" fill="#DE2910" p-id="8846"></path><path d="M555.5 415.8c-24.5 23-38.2 53-41.4 84 4.6-12.7 13.3-26.4 24.4-36.8 26.3-24.6 71.3-32.4 96.9-24.2l-1.3 4.3c-24.4-7.8-67.4-0.3-92.5 23.2-10.2 9.5-18.6 22.4-23 34.2 2.3-3.6 5.1-7.1 8.3-10.2 21.8-20.4 55.6-19.7 76.7 1 1.1 0.7 3.6 3.1 3.9 3.4 25.8 26.5 67.9 28.1 95.7 4.1 4.8-4.2 8.8-9.6 11.6-12.2 17.3-16.2 44.6-15.2 61 2.3 0.9 1 1.6 2.1 2.5 3.3-4.4-22.8-15.4-44.9-33.2-63.9-50.4-53.8-135.9-62.9-189.6-12.5z m106.6 45.7l-9.4 12.4-4.1-14.9-14.7-5.2 13-8.5 0.3-15.5 12.2 9.7 14.9-4.5-5.5 14.5 8.9 12.8-15.6-0.8zM519.6 565.7c-6.7 35.4-38.6 68.2-64.1 76.7l-1.4-4.2c24.3-8.1 54.7-39.4 61.1-73.3 2.6-13.6 1.8-28.8-1.4-40.8 0.2 4.2 0 8.5-0.8 12.8-5.6 29.3-33.3 48.6-62.5 44.3-1.3 0.1-4.7-0.4-5.2-0.5-36.5-6.2-71.4 17.2-79.8 53-1.4 6.3-1.4 12.9-2.2 16.6-4.4 23.3-27.2 38.6-50.7 34.1-1.3-0.3-2.6-0.8-3.9-1.2 17 15.8 38.8 27.2 64.4 32.1C445.5 729.1 519.9 686.1 533.7 613.8c6.3-33.2-0.4-65.8-16.3-92.7 3.9 12.9 5.1 29.3 2.2 44.6z m-83.7 90.1l-9.4 12.4-4.2-15-14.7-5.1 12.9-8.6 0.3-15.5 12.2 9.6 14.8-4.5-5.4 14.5 8.9 12.7-15.4-0.5z" fill="#FFFFFF" p-id="8847"></path><path d="M616.5 522.7c-29.6-16.3-62.6-20.1-93.3-13.2 13.6 0.2 29.6 4.2 43.2 11.7 31.5 17.4 52.8 57.9 52.9 84.7h-4.4c-0.1-25.6-20.5-64.2-50.6-80.9-12.2-6.7-26.9-10.7-39.3-11.3 4.1 1.1 8.1 2.6 12 4.8 26.1 14.4 35.9 46.8 22.7 73.3-0.3 1.2-1.8 4.3-2.1 4.7-17.2 32.7-5.9 73.2 25.7 92.3 5.5 3.3 11.8 5.4 15.1 7.3 20.7 11.4 28.2 37.8 16.6 58.8-0.7 1.2-1.6 2.2-2.3 3.3 20.3-11.3 38-28.5 50.6-51.3 35.4-64.5 17.7-148.6-46.8-184.2z m2.9 118.1l-9.4 12.4-4.1-15-14.7-5.1 12.9-8.6 0.3-15.5 12.1 9.7 14.9-4.5-5.5 14.6 8.9 12.8-15.4-0.8zM420.4 563.2c33.4-4 62.4-20.2 83.3-43.4-11.2 7.7-26.4 13.6-41.7 15.5-35.8 4.3-76.7-16.2-92.4-37.9l3.6-2.6c15.1 20.8 54.1 40.2 88.3 36.1 13.9-1.7 28.2-7 38.7-13.8-4 1.5-8.2 2.6-12.7 3.2-29.7 3.5-56.4-17-61.2-46.2-0.4-1.2-1-4.6-1.1-5-5.2-36.7-38-62.9-74.7-60-6.4 0.5-12.8 2.5-16.5 2.9-23.5 2.8-44.9-14.2-47.8-38.1-0.2-1.3-0.1-2.7-0.1-4-10 21-14.3 45.2-11.2 71.1 8.8 73 72.4 130.9 145.5 122.2z m-71.3-94.2l0.4-15.5 12.1 9.8 14.9-4.4-5.5 14.5 8.7 12.8-15.5-0.7-9.4 12.3-4-15-14.7-5.1 13-8.7z" fill="#FFFFFF" p-id="8848"></path><path d="M501.8 506.4c-10.8-8.2-21.4-20.9-27.9-34.9-15.2-32.6-8.5-77.9 7.2-99.7l3.6 2.6c-15 20.7-21.4 63.9-6.8 95.1 5.9 12.7 15.6 24.8 25.5 32.7-2.8-3.4-5.3-7.1-7.2-11.3-12.6-27-1.4-58.9 24.8-72.5 1-0.8 4-2.5 4.5-2.7 33.2-16.3 48-55.6 33.8-89.6-2.5-5.9-6.3-11.4-7.9-14.8-10-21.5-0.5-47.1 21.2-57.3 1.3-0.6 2.6-0.9 3.9-1.3-23-2.9-47.4 0.6-71 11.6-66.8 31.1-102 109.5-71 176.2 14.2 30.8 38.6 53.3 67.3 65.9z m-12.6-157l0.3-15.5 12.1 9.7 14.8-4.4-5.5 14.5 8.9 12.8-15.5-0.7-9.4 12.4-4-15-14.7-5.2 13-8.6z" fill="#FFFFFF" p-id="8849"></path></svg>`,
      delete: true,
    },
    {
      key: 3,
      name: "国内定向",
      out: "netflix.com",
      rules: "geosite:cn",
      node: "香港02",
      icon: `<svg t="1707124177755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2725" width="18" height="18"><path d="M512 1024C238.7968 1024 15.5648 809.984 0.768 540.433067h1022.464C1008.4352 809.984 785.2032 1024 512 1024z" fill="#F7F7F9" p-id="2726"></path><path d="M512 0c282.760533 0 512 229.239467 512 512 0 9.557333-0.290133 19.029333-0.768 28.450133H0.768C0.256 530.978133 0 521.489067 0 512 0 229.239467 229.239467 0 512 0z" fill="#E24654" p-id="2727"></path><path d="M276.736 262.997333c0-80.520533 47.786667-149.725867 115.7632-182.4768-13.841067-2.491733-27.6992-5.034667-41.5232-5.034666-103.202133 0-187.511467 84.343467-187.511467 187.511466 0 103.202133 84.309333 186.248533 186.2656 186.248534 13.824 0 28.928-1.245867 41.5232-5.034667a200.8576 200.8576 0 0 1-114.517333-181.179733v-0.034134z m202.581333-151.005866l11.349334 32.699733h35.208533l-28.928 21.418667 11.332267 32.7168-28.962134-20.138667-27.682133 20.138667 10.069333-32.7168-27.665066-21.384534h35.208533l10.069333-32.7168v-0.017066z m64.2048 201.352533l11.3152 32.7168h35.208534l-28.928 21.384533 11.332266 32.7168-28.928-20.1216-27.716266 20.1216 10.069333-32.7168-27.665067-21.384533h35.242667l10.069333-32.7168z m-128.375466 0l10.069333 32.7168h35.242667l-27.6992 21.384533 10.069333 32.7168-27.682133-20.1216-28.928 20.1216 11.3152-32.7168-28.945067-21.384533h35.242667l11.3152-32.7168z m168.618666-124.586667l11.3152 33.9968h35.2768l-28.962133 20.104534 11.332267 33.9968-28.962134-21.4016-28.928 21.4016 11.3152-33.9968-28.945066-20.104534h35.259733l11.298133-33.9968z m-210.141866 0l11.3152 33.9968h35.2768l-28.962134 20.104534 11.3152 33.9968-28.945066-21.4016-27.682134 21.4016 11.3152-33.9968-28.928-20.104534h35.2256l10.069334-33.9968z" fill="#FFFFFF" p-id="2728"></path></svg>`,
      delete: true,
    },
  ];
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
  return (
    <Wrap className="center" style={{ alignItems: "start" }}>
      {contextHolder}
      <div className="profile">
        <Divider className="title" orientationMargin={10}>
          我的订阅
        </Divider>
        <div className="center item">
          <div>订阅</div>
          <div style={{ flex: 1 }}></div>
          <div>
            {!loading ? (
              state.plan.includes("未订阅") ? (
                <div style={{ color: "red" }}>未订阅</div>
              ) : (
                state.plan
              )
            ) : (
              <Spin />
            )}
          </div>
        </div>
        <div className="center item">
          <div>到期时间</div>
          <div style={{ flex: 1 }}></div>
          <div>
            {!loading ? (
              state.expireTime < getCurrentTimeStamp() ? (
                <div style={{ color: "red" }}>已到期</div>
              ) : (
                formatTimestamp(state.expireTime)
              )
            ) : (
              <Spin />
            )}
          </div>
        </div>
        <div className="center item">
          <div>重置</div>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: "#cecece" }}>{!loading ? state.reset === "" ? "无重置" : state.reset : <Spin />}</div>
        </div>
        <div className="center item" style={{ minHeight: "45px" }}>
          <div>已使用/剩余流量</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div>
              <div>
                <Progress showInfo={false} percent={state.used / (state.remaining + state.used)} size="small" />
              </div>
              <div>
                {formatBytes(state.used)}/{formatBytes(state.remaining)}
              </div>
            </div>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>TG频道(优惠&调整等信息)</div>
          <div style={{ flex: 1 }}></div>
          <div>
            {!loading ? (
              <Link
                to={"https://t.me/+3dVeQeY4NjEzNGNl"}
                style={{ textDecoration: "none", color: "#2c73ff" }}
                target="_blank"
              >
                t.me/+3dVeQeY4NjEzNGNl
              </Link>
            ) : (
              <Spin />
            )}
          </div>
        </div>
        <Divider className="title" orientationMargin={10}>
          基本设置
        </Divider>
        <div className="center item">
          <div>ZOOM CORE</div>
          <div style={{ flex: 1 }}></div>
          <div>{!loading ? state.version : <Spin />}</div>
        </div>
        <div className="center item">
          <div>启用订阅</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Switch defaultChecked={state.system} onChange={() => (state.system = !state.system)} />
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>云端规则</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Switch defaultChecked={state.cloudRules} onChange={() => (state.cloudRules = !state.cloudRules)} />
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>限制设备</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Switch defaultChecked={state.concurrent} onChange={() => (state.concurrent = !state.concurrent)} />
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>订阅到期邮件通知</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Switch
              defaultChecked={state.bascEmailNotify}
              onChange={() => (state.bascEmailNotify = !state.bascEmailNotify)}
            />
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>推送优惠活动邮件</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Switch
              defaultChecked={state.marketingEmailNotify}
              onChange={() => (state.marketingEmailNotify = !state.marketingEmailNotify)}
            />
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>带宽限制</div>
          <div style={{ flex: 1 }}></div>
          <div>
            {!loading ? (
              <Input
                style={{ width: "100px" }}
                value={state.rateLimit}
                onChange={(e: any) => (state.rateLimit = e.target.value)}
              />
            ) : (
              <Spin style={{ marginTop: "12px" }} />
            )}
          </div>
        </div>
        <Divider className="title" orientationMargin={10}>
          订阅链接
        </Divider>
        <div className="center item">
          <div>手动导入</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div
              className="usenone"
              id="linkbutton"
              data-clipboard-text={`${state.subscription}&target=clash`}
              style={{ color: "green" }}
            >
              复制链接
            </div>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>扫码导入</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div className="usenone" onClick={() => (state.showQr = true)} style={{ color: "green" }}>
              打开二维码
            </div>
          ) : (
            <Spin />
          )}
        </div>

        <div className="center item">
          <div>Surge(Mac)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Link
              to={"https://apps.apple.com/us/app/surge-5/id1442620678"}
              target="_blank"
              style={{ marginLeft: "10px", color: "#2962ff" }}
            >
              下载软件
            </Link>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>V2rayU(Mac)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <Link
              to={"https://github.com/yanue/V2rayU/releases"}
              target="_blank"
              style={{ marginLeft: "10px", color: "#2962ff" }}
            >
              下载软件
            </Link>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>ClashX Pro(Mac)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div className="center">
              <div
                onClick={() => {
                  window.open(
                    `clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`,
                    "_blank"
                  );
                }}
                style={{ color: "green" }}
                className="usenone"
              >
                一键导入
              </div>
              <Link
                to={"https://github.com/eujc/rj/releases/tag/ClashX"}
                target="_blank"
                style={{ marginLeft: "10px", color: "#2962ff" }}
              >
                下载软件
              </Link>
            </div>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>Clash(Android)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div className="center">
              <div
                onClick={() => {
                  window.open(
                    `clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`,
                    "_blank"
                  );
                }}
                style={{ color: "green" }}
                className="usenone"
              >
                一键导入
              </div>
              <Link
                to={"https://dl.clashforandroid.org/releases/latest/cfa-2.5.12-premium-universal-release.apk"}
                target="_blank"
                style={{ marginLeft: "10px", color: "#2962ff" }}
              >
                下载软件
              </Link>
            </div>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>Shadowrocket(IOS)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div className="center">
              <div
                onClick={() => {
                  window.open(`shadowrocket://add/${state.subscription}&target=clash&remark=ZOOM`, "_blank");
                }}
                style={{ color: "green" }}
                className="usenone"
              >
                一键导入
              </div>
              <Link
                to={"https://apps.apple.com/us/app/shadowrocket/id932747118"}
                target="_blank"
                style={{ marginLeft: "10px", color: "#2962ff" }}
              >
                下载软件
              </Link>
            </div>
          ) : (
            <Spin />
          )}
        </div>
        <div className="center item">
          <div>Clash(window)</div>
          <div style={{ flex: 1 }}></div>
          {!loading ? (
            <div className="center">
              <div
                onClick={() => {
                  window.open(
                    `clash://install-config?url=${encodeURIComponent(state.subscription)}&target=clash&name=ZOOM`,
                    "_blank"
                  );
                }}
                style={{ color: "green" }}
                className="usenone"
              >
                一键导入
              </div>
              <Link
                to={"https://github.com/cfwtf/clash_for_windows/releases"}
                target="_blank"
                style={{ marginLeft: "10px", color: "#2962ff" }}
              >
                下载软件
              </Link>
            </div>
          ) : (
            <Spin />
          )}
        </div>
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
        modalRender={(modal) => <Qr sub={state.subscription + "&target=clash"} />}
      />
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <div className="panel">
          <div className="ruleTitle usenone">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5981"
              width="20"
              height="20"
            >
              <path
                d="M864 160h-164.512A127.712 127.712 0 0 0 576 64a128 128 0 0 0 0 256 127.712 127.712 0 0 0 123.488-96H864a32 32 0 0 1 32 32v288a32 32 0 0 1-32 32h-304a32 32 0 0 0 0 64H864a96 96 0 0 0 96-96V256a96 96 0 0 0-96-96z m-288 96a64 64 0 1 1 0.032-128.032A64 64 0 0 1 576 256z"
                p-id="5982"
                fill="#5fa057"
              ></path>
              <path
                d="M832 704c-57.376 0-105.376 38.016-121.632 90.048H384a31.872 31.872 0 0 1-31.744-30.656A127.68 127.68 0 0 0 320 512c-47.264 0-88.064 25.888-110.24 64H160a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h208a32 32 0 0 0 0-64H160a96 96 0 0 0-96 96v288a96 96 0 0 0 96 96h32a127.68 127.68 0 0 0 96.16 123.52A95.936 95.936 0 0 0 384 858.08h322.688A128 128 0 1 0 832 704zM256 640a64 64 0 1 1 128.032 0.032A64 64 0 0 1 256 640z m576 256a64 64 0 1 1 0.032-128.032A64 64 0 0 1 832 896z"
                p-id="5983"
                fill="#5fa057"
              ></path>
            </svg>
            云端规则
          </div>
          <div className="header">
            <div>编号</div>
            <div>方向</div>
            <div>节点</div>
            <div>地区</div>
            <div>目标</div>
            <div>规则</div>
            <div>操作</div>
          </div>
          {data.map((item, index: number) => {
            return <RuleItem key={item.key} data={item} index={index + 1} />;
          })}
          <div className="add center usenone">
            <svg
              style={{ marginRight: "5px" }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3757"
              width="20"
              height="20"
            >
              <path
                d="M448 448V256h128v192h192v128H576v192H448V576H256V448h192z m64 576c-282.7712 0-512-229.2288-512-512S229.2288 0 512 0s512 229.2288 512 512-229.2288 512-512 512z m0-128c212.0768 0 384-171.9232 384-384s-171.9232-384-384-384-384 171.9232-384 384 171.9232 384 384 384z"
                fill="#5fa057"
                p-id="3758"
              ></path>
            </svg>
            添加规则
          </div>
        </div>
        <div className="share usenone">
          <div className="title">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8277"
              width="20"
              height="20"
            >
              <path
                d="M949.80096 514.7648A81.92 81.92 0 0 1 962.56 558.67392V839.68a122.88 122.88 0 0 1-122.88 122.88H184.32a122.88 122.88 0 0 1-122.88-122.88V558.98112a81.92 81.92 0 0 1 125.952-69.07904L511.13984 696.32l325.57056-206.78656a81.92 81.92 0 0 1 113.09056 25.23136zM716.8 102.4a122.88 122.88 0 0 1 122.88 122.88v204.8L512.67584 634.88 184.32 430.08V225.28a122.88 122.88 0 0 1 122.88-122.88h409.6z"
                fill="#5fa057"
                p-id="8278"
              ></path>
              <path
                d="M537.45664 460.55424a36.1472 36.1472 0 0 1-50.91328 0l-93.30688-92.7744-1.31072-1.31072a83.1488 83.1488 0 0 1 1.31072-116.736 84.33664 84.33664 0 0 1 118.76352 0 84.33664 84.33664 0 0 1 118.76352 0 83.1488 83.1488 0 0 1 1.49504 116.5312l-1.49504 1.536-93.30688 92.7744z"
                fill="#141414"
                p-id="8279"
              ></path>
            </svg>
            我的邀请
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default DashBoard;
