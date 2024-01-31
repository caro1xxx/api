// @ts-nocheck
import { LuckyWheel } from "@lucky-canvas/react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { getPrizePool, startLottery, checkIsLottry } from "../api/other";
import { useReactive, useRequest } from "ahooks";
import { Spin, message } from "antd";
import { useAppSelector } from "../redux/hooks";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  pointer-events: auto;
  .logo {
    background-image: url("https://pic.imgdb.cn/item/65baa682871b83018a7a741b.png");
    background-size: 100%;
    height: 180px;
    background-repeat: no-repeat;
    width: 450px;
  }
`;
const Result = styled.div`
  margin-bottom: 10px;
  .code {
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #705feb;
    font-size: 20px;
    > a {
      color: black;
      text-decoration: underline;
    }
  }
`;

type Props = {};

const Turntable = (props: Props) => {
  const prizes = useReactive([]);
  const token = useAppSelector((state) => state.user.token);
  const state = useReactive({
    isLotteryed: false,
    showResult: false,
    result: {
      code: "",
      name: "",
      type: "",
    },
  });
  const [messageApi, contextHolder] = message.useMessage();
  const { loading } = useRequest(getPrizePool, {
    cacheKey: "PrizePool",
    onSuccess: (result) => {
      result.forEach((item) => {
        prizes.push({
          background: item.fields.type === "流量" ? "#fbf4fc" : "#f2dff7",
          fonts: [
            {
              fontColor: item.fields.type === "流量" ? "#4a90fa" : "#d13316",
              text: item.fields.name,
              top: 10,
              lineClamp: 3,
              fontSize: 25,
            },
          ],
          imgs: [
            {
              src: item.fields.icon,
              width: "40%",
              top: "30%",
            },
          ],
        });
      });
    },
  });
  const { data, loading: isLotteryLoading } = useRequest(checkIsLottry, {
    cacheKey: "isLottery",
    onSuccess: (result) => {
      if (result.code === 201) {
        messageApi.info(result.message);
        state.showResult = true;
        state.result.code = result.prize.code;
      }
    },
  });
  const [blocks] = useState([{ padding: "20px", background: "#705feb" }]);

  const [buttons] = useState([
    {
      radius: "30%",
      imgs: [
        {
          src: "https://pic.imgdb.cn/item/65ba9696871b83018a604a0e.png",
          width: "100%",
          top: "-100%",
        },
      ],
    },
  ]);
  const myLucky = useRef();

  const lottery = async () => {
    if (!token) {
      messageApi.info("请先注册后再抽奖");
    } else if (data.code !== 200 || state.isLotteryed) {
      messageApi.info("您今日已抽奖,请明天再来");
    } else {
      myLucky.current.play();
      let result = await startLottery();
      if (result.code === 200) {
        myLucky.current.stop(result.prize.idx - 1);
        state.result.code = result.prize.code;
        state.result.name = result.prize.name;
        state.result.type = result.prize.type;
      } else {
        messageApi.info(result.message);
      }
      state.isLotteryed = true;
    }
  };

  return (
    <Wrap>
      {contextHolder}
      <div className="logo"></div>
      {state.showResult && (
        <Result className="center">
          <div className="code">
            兑换码:{state.result.code}{" "}
            <Link to={"https://t.me/ZoomCloud"} target="_blank">
              前往TG兑换
            </Link>
          </div>
        </Result>
      )}
      <div className="center">
        {loading || isLotteryLoading ? (
          <Spin />
        ) : (
          <LuckyWheel
            ref={myLucky}
            width="400px"
            height="400px"
            blocks={blocks}
            prizes={prizes}
            buttons={buttons}
            onStart={lottery}
            onEnd={(prize) => {
              state.showResult = true;
              messageApi.info(`恭喜获得${state.result.type} ${state.result.name}`);
            }}
          />
        )}
      </div>
    </Wrap>
  );
};

export default Turntable;
