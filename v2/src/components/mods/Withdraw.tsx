import styled from "styled-components";
import { Input, Select, Space, Button, message } from "antd";
import { useReactive } from "ahooks";

const Wrap = styled.div`
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  pointer-events: auto;
  overflow: hidden;
  padding: 20px;
`;

type Props = {
  balance: string;
};

const Withdraw = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useReactive({
    way: "",
    value: "",
  });

  const withdraw = () => {
    if (!state.value) {
      messageApi.info("请设置8位数口令");
    } else if (parseFloat(props.balance) === 0.0) {
      messageApi.info("无可提现金额");
    } else if (parseFloat(props.balance) < 100) {
      messageApi.info("100元起提");
    }
  };
  return (
    <Wrap>
      {contextHolder}
      <Select
        style={{ width: "100%" }}
        defaultValue={"请选择收款方式"}
        onSelect={(e) => (state.way = e)}
        options={[
          { value: "alipay", label: "支付宝口令红包" },
          { value: "USDT", label: "USDT(手续费5%)", disabled: true },
        ]}
      />
      {state.way === "alipay" && (
        <Space.Compact style={{ width: "100%", marginTop: "10px" }}>
          <Input
            value={state.value}
            showCount
            onChange={(e) => (state.value = e.target.value)}
            placeholder="请设置8位数口令"
            maxLength={8}
          />
          <Button type="primary" onClick={withdraw}>
            提交
          </Button>
        </Space.Compact>
      )}
      {state.way === "alipay" && (
        <div style={{ fontSize: "10px", color: "#8f8f8f", marginTop: "5px" }}>
          24小时内将发送你设置的口令红包,请留意邮件
        </div>
      )}
    </Wrap>
  );
};

export default Withdraw;
