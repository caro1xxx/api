// @ts-nocheck
import { SlotMachine } from "@lucky-canvas/react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { getPrizePool, startLottery, checkIsLottry } from "../api/other";
import { useReactive, useRequest } from "ahooks";
import { Spin, message, Button, Empty } from "antd";
import { useAppSelector } from "../redux/hooks";

const Wrap = styled.div`
  pointer-events: auto;
  background-color: #7f7aff7d;
  border-radius: 10px;
  padding: 0px 20px;
  padding-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(198, 198, 198, 0.2), 0 6px 20px 0 rgba(150, 150, 150, 0.19);
  .logo {
    background-image: url("https://pic.imgdb.cn/item/65bd3bb6871b83018a3e141a.png");
    background-size: 100%;
    height: 100px;
    width: 360px;
  }
  .start {
    padding: 10px;
    background-color: #7572bd;
  }
  .rules {
    user-select: none;
    cursor: pointer;
    background-color: #3a6fff6b;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
    color: white;
    border: 2px solid #4476ff;
    .title {
      font-size: 13px;
    }
    .content {
      font-size: 10px;
    }
  }
  .history {
    margin-top: 10px;
    padding-bottom: 20px;
    color: white;
    .title {
      font-size: 13px;
    }
  }
`;

type Props = {};

const SlotMachineComponent = (props: Props) => {
  const prizes = useReactive([]);
  const token = useAppSelector((state) => state.user.token);
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    isLotteryed: false,
    showResult: false,
    result: {
      code: "",
      name: "",
      type: "",
    },
  });
  const [blocks] = useState([
    { padding: "10px", background: "#6d6ac7" },
    { padding: "10px", background: "#918dff" },
  ]);

  const { loading } = useRequest(getPrizePool, {
    cacheKey: "PrizePool",
    onSuccess: (result) => {
      result.forEach((item) => {
        prizes.push({
          borderRadius: "10px",
          fonts: [{ text: item.fields.name, top: "0%", fontSize: "25px", fontColor: "#3e82ff" }],
          imgs: [
            {
              width: "100%",
              top: "100%",
              src: "https://pic.imgdb.cn/item/65bd35ad871b83018a312c88.png",
            },
            {
              width: "60%",
              top: "20%",
              src: item.fields.icon,
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

  const lottery = async () => {
    let result = await startLottery();
    if (result.code === 200) {
      myLucky.current.stop(result.prize.idx - 1);
      state.result.code = result.prize.code;
      state.result.name = result.prize.name;
      state.result.type = result.prize.type;
    } else {
      messageApi.info(result.message);
    }
  };

  const testLottery = () => {
    myLucky.current.play();
    setTimeout(() => {
      myLucky.current.stop(Math.floor(Math.random() * 10) - 1);
    }, 3000);
  };

  const myLucky = useRef();
  return (
    <Wrap>
      {contextHolder}
      <div>
        <div className="logo"></div>
      </div>
      {!loading || isLotteryLoading ? (
        <SlotMachine
          ref={myLucky}
          width="360px"
          height="200px"
          blocks={blocks}
          prizes={prizes}
          defaultConfig={{ rowSpacing: "10px", colSpacing: "10px" }}
          slots={[
            { speed: 5, direction: 1 },
            { speed: 5, direction: -1 },
            { speed: 5, direction: 1 },
          ]}
          onEnd={(prize) => {
            state.showResult = true;
            messageApi.info(`恭喜获得${state.result.type} ${state.result.name},请刷新网页查看订阅是否到账`);
          }}
        />
      ) : (
        <div style={{ width: "360px", height: "200px", backgroundColor: "#7572bd" }} className="center">
          <Spin />
        </div>
      )}
      <div className="center start">
        <Button onClick={testLottery} style={{ flex: 1, backgroundColor: "#9a97f3", border: "none", color: "#fff" }}>
          试抽
        </Button>
        <Button
          onClick={() => {
            if (!token) {
              messageApi.info("请先注册后再抽奖");
            } else if (data.code !== 200 || state.isLotteryed) {
              messageApi.info("您今日已抽奖,请明天再来");
            } else {
              myLucky.current.play();
              lottery();
              state.isLotteryed = true;
            }
          }}
          style={{ backgroundColor: "#6d9cf2", color: "#fff", width: "70%", marginLeft: "10px", border: "none" }}
        >
          开始抽奖
        </Button>
      </div>
      <div className="rules">
        <div className="title">活动规则:</div>
        <div className="content">每日一次抽奖机会 百分百中奖 奖品几率纯随机(random函数) 无内幕 每日20:00奖池更新</div>
        <div className="content">已订阅用户获得中奖奖品*2 未订阅用户活动奖品*1</div>
        <div className="content">内测用户获得中奖奖品*3(请联系TG)</div>
      </div>
      {/* <div className="history">
        <div className="title">历史奖品记录</div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无记录" />
      </div> */}
    </Wrap>
  );
};

export default SlotMachineComponent;
