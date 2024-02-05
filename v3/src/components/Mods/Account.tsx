import styled from "styled-components";
import { Select, Button } from "antd";
import { useReactive } from "ahooks";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  background-color: #151515;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  pointer-events: auto;
  padding: 20px;
  color: white;
  .rules {
    background-color: #78ff612b;
    border: 1px solid #5dff40;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    font-size: 10px;
  }
`;

type Props = {};

const Account = (props: Props) => {
  const state = useReactive({
    type: "",
  });
  return (
    <Wrap>
      <label>选择账号</label>
      <div>
        <Select
          defaultValue="请选择类型"
          style={{ width: "100%", marginTop: "5px" }}
          onChange={(e) => (state.type = e)}
          options={[
            { value: "netflix", label: "Netflix账号 当前总计500个" },
            { value: "shadowrocket", label: "小火箭下载账号" },
            { value: "disabled", label: "disney+账号", disabled: true },
            { value: "surge", label: "Mac Surge下载" },
          ]}
        />
      </div>
      <Button type="primary" style={{ width: "100%", marginTop: "10px" }}>
        获取账号
      </Button>
      {state.type === "" ? (
        <div></div>
      ) : state.type === "netflix" ? (
        <div className="rules">
          活动说明:
          <div>1.我们保证Netflix账号数是本站已订阅用户的50% 代表您有50%概率可以抽中账号</div>
          <div style={{ marginTop: "5px" }}>
            2.已订阅用户并且订阅的计划是具有该账号的 每月均有一次100%抽中的机会 后续靠用户拼手速
          </div>
          <div style={{ marginTop: "5px" }}>3.每个账号有24小时使用权,到期后您将重新进行抢号</div>
          <div style={{ marginTop: "5px" }}>
            4.每天20:00开始抢号 为保证公平 防止作弊 开始时间随时有变.仅以本页时间为主
          </div>
        </div>
      ) : state.type === "shadowrocket" ? (
        <div className="rules">
          活动说明:
          <div>1.请使用账号登录AppStore 请勿登录系统设置账号</div>
          <div style={{ marginTop: "5px" }}>
            2.如有登录验证码请联系TG
            <Link to={"https://t.me/+TLIYTuYmkSliZmRi"} target="_blank">
              t.me/+TLIYTuY
            </Link>
          </div>
          <div style={{ marginTop: "5px" }}>3.使用完账号后请自觉退出 以免造成财产损失</div>
        </div>
      ) : state.type === "surge" ? (
        <div className="rules">
          活动说明:
          <div>1.仅支持M系列Mac</div>
        </div>
      ) : null}
    </Wrap>
  );
};

export default Account;
