import { TypesPlanItem } from "../types/state";
import styled from "styled-components";
import { createOrder } from "../api/order";
import { useReactive } from "ahooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getCurrentTimeStamp, secondsTotimer } from "../utils/tools";
import { useCountDown } from "ahooks";

type Props = {
  data: TypesPlanItem;
};

const Wrap = styled.div`
  padding: 30px 20px;
  background-color: #f7f6f7;
  border-radius: 10px;
  color: black;
  position: relative;
  .title {
    line-height: 30px;
    font-size: 35px;
    font-family: "Bungler";
    .price {
      font-weight: bolder;
      font-size: 25px;
      font-family: "Consolas";
    }
  }
`;

const Featrue = styled.div`
  margin: 30px 0px;
  .item {
    margin-top: 15px;
    justify-content: start;
    span {
      color: #006eff;
    }
  }
`;

const Gift = styled.div`
  position: absolute;
  top: -15px;
  text-align: center;
  line-height: 30px;
  right: 20px;
  left: 20px;
  height: 30px;
  background-color: #ffc04a;
  border-radius: 5px;
`;

const PlanItem = (props: Props) => {
  const navigate = useNavigate();
  const state = useReactive({
    loading: false,
    giftTimer:
      props.data.fields.giftStartTime > getCurrentTimeStamp()
        ? (props.data.fields.giftStartTime - getCurrentTimeStamp()) * 1000
        : props.data.fields.giftEndTime > getCurrentTimeStamp()
        ? (props.data.fields.giftEndTime - getCurrentTimeStamp()) * 1000
        : 0,
  });
  const [countdown] = useCountDown({
    leftTime: state.giftTimer,
    onEnd: () => {
      if (props.data.fields.giftEndTime > getCurrentTimeStamp()) {
        state.giftTimer = (props.data.fields.giftEndTime - getCurrentTimeStamp()) * 1000;
      }
    },
  });
  const check = async (planId: string) => {
    if (state.loading) return;
    let result = await createOrder(planId);
    if (result.code === 200) {
      navigate(`/order?no=${result.order}`);
    }
    state.loading = false;
  };

  return (
    <Wrap>
      {props.data.fields.giftSumCount > 0 ? (
        props.data.fields.giftStartTime > getCurrentTimeStamp() ? (
          <Gift>活动开始倒计时{secondsTotimer(Math.round(countdown / 1000))}</Gift>
        ) : props.data.fields.giftEndTime > getCurrentTimeStamp() ? (
          <Gift>活动结束倒计时{secondsTotimer(Math.round(countdown / 1000))}</Gift>
        ) : null
      ) : null}
      <div className="title center">
        <div>ZOOM {props.data.fields.title}</div>
        <div style={{ flex: 1 }}></div>
        <div className="price">
          ￥{props.data.fields.price}
          <span style={{ fontSize: "10px" }}>/{props.data.fields.time}天</span>
        </div>
      </div>
      <Featrue>
        <div>包含</div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          每<span>30</span>天<span>{props.data.fields.flow / (props.data.fields.time / 30)}</span>GB 流量
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            全球<span>17</span>国家/地区 优质中转线路
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            解锁<span>流媒体服务</span>
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            <span>不限制</span>同时使用设备个数
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            每月购买日<span>免费</span>手动<span>重置流量</span>
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            <span>自研云端</span>代理规则面板
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            赠送<span>Surge&小火箭</span>软件下载账号
          </div>
        </div>
        <div className="center item">
          <svg
            style={{ marginRight: "5px" }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2357"
            width="18"
            height="18"
          >
            <path
              d="M512.154014 0c-282.66615 0-511.847009 229.172493-511.847009 511.826038 0 282.653545 229.18086 511.826038 511.847009 511.826038s511.844963-229.172493 511.844963-511.826038C1023.998977 229.172493 794.820164 0 512.154014 0zM512.154014 927.685397c-229.6823 0-415.875375-186.187493-415.875375-415.859359S282.471714 95.966679 512.154014 95.966679c229.67923 0 415.874352 186.187493 415.874352 415.859359S741.834268 927.685397 512.154014 927.685397zM710.825796 286.197254 439.673336 557.1145 313.173181 430.68502 222.749117 521.018398 439.673336 737.801722 801.248836 376.49277Z"
              fill="#2c2c2c"
              p-id="2358"
            ></path>
          </svg>
          <div>
            承诺<span>不记录客户端</span>任何流量
          </div>
        </div>
        <div style={{ fontSize: "10px", marginTop: "20px" }} className="center">
          <div>剩余:{props.data.fields.stock}</div>
          <div style={{ flex: 1 }}></div>
          <span style={{ fontWeight: "bolder", color: "#006eff" }}>无退款服务</span> 介意请勿下单
        </div>
      </Featrue>
      <Button
        style={{ width: "100%" }}
        type="dashed"
        onClick={() => {
          if (props.data.fields.stock === 0) return;
          check(props.data.pk);
        }}
      >
        {props.data.fields.stock === 0
          ? "已售罄"
          : props.data.fields.giftEndTime > getCurrentTimeStamp()
          ? `订阅(活动价:${props.data.fields.giftPrice}￥剩余:${props.data.fields.giftCurrentCount})`
          : "订阅"}
      </Button>
    </Wrap>
  );
};

export default PlanItem;
