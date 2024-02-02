import styled from "styled-components";
import { Input, Select, Button, message, Tag, Empty } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { formatTimestamp, parseJwt } from "../../utils/tools";
import { useReactive, useRequest } from "ahooks";
import { createTicket, tickets } from "../../api/other";
import { TicketTypes } from "../../types/state";

const Wrap = styled.div`
  height: calc(100vh);
  color: black;
  padding: 10px 20px;
  overflow-y: scroll;
  user-select: none;
  position: relative;
  > label {
    font-size: 13px;
    margin-bottom: 5px;
    color: #696969;
    display: inline-block;
    margin-top: 20px;
  }
  .submit {
    margin-top: 10px;
    width: 100%;
  }
`;

const TicketItem = styled.div`
  .item {
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px;
    background-color: #e4e4e42a;
    color: #797979;
    font-size: 13px;
    .time {
      margin-top: 10px;
      text-align: end;
      font-family: Helvetica;
      font-size: 10px;
    }
  }
`;

const { TextArea } = Input;

type Props = {};

const Ticket = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAppSelector((state) => state.user.token);
  const state = useReactive({
    email: parseJwt(token).username,
    type: "请选择",
    content: "",
  });

  const { data, loading } = useRequest(tickets, { cacheKey: "tickets" });

  const create = async () => {
    if (state.email && state.type !== "请选择" && state.content) {
      let result = await createTicket(state.email, state.content, state.type);
      if (result.code === 200) {
        messageApi.success("提交成功,请耐心等待");
      } else {
        messageApi.error("提交失败,请发送邮件到support@zoomm.cloud");
      }
    } else {
      messageApi.info("请输入完整");
    }
  };
  return (
    <Wrap>
      {contextHolder}
      <label htmlFor="email">联系邮箱(后续处理结果将发送到该邮箱)</label>
      <Input
        value={state.email}
        onChange={(e) => (state.email = e.target.value)}
        placeholder="联系邮箱"
        prefix={<MailOutlined style={{ color: "#696969" }} />}
      />
      <label htmlFor="email">问题类型</label>
      <div>
        <Select
          defaultValue="请选择类型"
          style={{ width: "100%" }}
          onChange={(e) => (state.type = e)}
          options={[
            { value: "account", label: "账号相关" },
            { value: "sub", label: "订阅相关" },
            { value: "charge", label: "续费相关" },
            { value: "use", label: "使用相关" },
          ]}
        />
      </div>
      <label htmlFor="email">详细内容</label>
      <TextArea
        value={state.content}
        onChange={(e) => (state.content = e.target.value)}
        showCount
        maxLength={200}
        rows={4}
        autoSize={false}
        placeholder="详细问题"
      />
      <div style={{ marginTop: "20px", color: "#acacac" }}>预计5分钟处理,请留意邮件</div>
      <Button type="primary" className="submit" onClick={create}>
        提交
      </Button>
      <label htmlFor="email">历史工单</label>
      <TicketItem>
        {!loading && data.length > 0 ? (
          data.map((item: TicketTypes, index: number) => {
            return (
              <div key={item.pk} className="item">
                <div>
                  #{index + 1}
                  {"  "}
                  {item.fields.content}
                </div>
                <div className="time center">
                  <Tag color="magenta">{item.fields.state === 0 ? "处理中" : "已完毕"}</Tag>
                  <div style={{ flex: 1 }}></div>
                  <div>{formatTimestamp(item.fields.createTime)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"无历史工单"} />
        )}
      </TicketItem>
      <div style={{ fontSize: "10px", textAlign: "center", marginTop: "20px" }}>ZOOM Panel version 0.1.14</div>
    </Wrap>
  );
};

export default Ticket;
