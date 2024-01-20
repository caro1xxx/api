import styled from "styled-components";
import { formatTimestamp, setStorage, isValidEmail } from "../utils/tools";
import { Button, Input, Space, Divider, Checkbox, message, Modal } from "antd";
import { useReactive, useRequest } from "ahooks";
import { getOrder, paymentOrder, orderDiscount } from "../api/order";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { saveToken } from "../redux/modules/user";
import Qr from "../components/mods/Qr";

const Wrap = styled.div`
  background-image: url("https://pic.imgdb.cn/item/65a62b90871b83018a1d96b9.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: calc(100vh);
  width: calc(100vw);
  display: flex;
  align-items: center;
  justify-content: center;
  .body {
    padding-top: 120px;
    user-select: none;
    background: linear-gradient(to bottom, #047670, #047670, #047670, #afff8f);
    width: 380px;
    min-height: 570px;
    margin: 0px auto;
    border-radius: 5px;
    color: white;
    padding: 20px;
    padding-top: 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .authinpout {
      margin-bottom: 10px;
    }
    .title {
      font-size: 20px;
      font-weight: bolder;
      color: white;
    }
    .googs {
      margin: 20px 0px;
      .iconWrap {
        background-color: #4b786f;
        height: 40px;
        width: 40px;
        border-radius: 5px;
        > div {
          background-image: url("https://pic.imgdb.cn/item/65a2c663871b83018a034c48.png");
          height: 25px;
          width: 25px;
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
      .goostitle {
        flex: 1;
        margin-left: 10px;
        font-size: 10px;
      }
    }
    .method {
      margin-bottom: 10px;
      color: #cbcbcb;
      font-size: 14px;
      .methodicon {
        height: 30px;
        width: 30px;
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
  }
`;
type Props = {};

const Order = (props: Props) => {
  const token = useAppSelector((state) => state.user.token) as string;
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const search = useLocation();
  const state = useReactive({
    username: "",
    password: "",
    method: "",
    loading: false,
    code: "",
    discountCode: "",
    actuallyPaid: "",
    wechat: {
      showWechatQr: false,
      qr: "",
    },
  });
  const { data, loading, run } = useRequest(getOrder, {
    manual: true,
    cacheKey: "order",
    onSuccess: (result) => {
      state.actuallyPaid = result.order.actuallyPaid;
      state.discountCode = result.order.discount;
    },
  });

  const payment = async (order: string) => {
    if (state.loading) {
      messageApi.info("下单中");
    } else if (state.method === "") {
      messageApi.info("请选择支付方式");
    } else if (!token && (!state.password || !state.username)) {
      messageApi.info("请输入账号密码 未注册用户自动注册");
    } else if (!token && !isValidEmail(state.username)) {
      messageApi.info("邮箱错误");
    } else if (!token && state.password.length < 6) {
      messageApi.info("密码最少6位数");
    } else {
      state.loading = true;
      let result = await paymentOrder(order, state.method, state.username, state.password);
      if (result.code === 200) {
        messageApi.success("下单成功");
        setStorage("token", result.token);
        dispatch(saveToken(result.token));
        if (result.order.code !== 1) {
          messageApi.info("当前支付环境异常,请联系客服");
        } else if (state.method === "wxpay") {
          state.wechat.qr = result.order.qrcode;
          state.wechat.showWechatQr = true;
        } else if (state.method === "alipay") {
          window.open(result.order.payurl);
        }
      } else {
        messageApi.info(result.message);
      }
      state.loading = false;
    }
  };

  const discount = async (order: string, code: string) => {
    let result = await orderDiscount(order, code);
    if (result.code === 200) {
      state.actuallyPaid = result.actuallyPaid;
      state.discountCode = code;
      messageApi.success(result.message);
    } else {
      messageApi.info(result.message);
    }
  };

  useEffect(() => {
    if (search.search) {
      run(search.search.replace("?no=", ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.search]);

  return (
    <Wrap>
      {contextHolder}
      {!loading ? (
        data && data.code === 200 ? (
          <div className="body">
            <Divider className="title">订单</Divider>
            <div className="googs center">
              <div className="iconWrap center">
                <div></div>
              </div>
              <div className="goostitle">
                <div style={{ fontSize: "17px", fontWeight: "bolder" }}>{data.order.title}计划 x1</div>
                <div>Zoom 特惠套餐</div>
              </div>
              <div style={{ fontWeight: "bolder" }}>￥{data.order.price}</div>
            </div>
            <div className="center" style={{ marginBottom: "10px" }}>
              <div>订单号</div>
              <div style={{ flex: 1 }}></div>
              <div>{data.order.no}</div>
            </div>
            <div className="center" style={{ marginBottom: "10px" }}>
              <div>订单创建时间</div>
              <div style={{ flex: 1 }}></div>
              <div>{formatTimestamp(data.order.createTime)}</div>
            </div>
            <div className="center" style={{ marginBottom: "10px" }}>
              <div>订单金额</div>
              <div style={{ flex: 1 }}></div>
              <div>{data.order.price}￥</div>
            </div>
            <div className="center" style={{ marginBottom: "10px" }}>
              <div>实付金额</div>
              <div style={{ flex: 1 }}></div>
              <div>{state.actuallyPaid ? state.actuallyPaid : data.order.actuallyPaid}￥</div>
            </div>
            <div className="center" style={{ marginBottom: "10px" }}>
              <div>折扣</div>
              <div style={{ flex: 1 }}></div>
              <div>
                {state.discountCode ? `折扣码:${state.discountCode}` : ""} -
                {state.actuallyPaid ? parseFloat(data.order.price) - parseFloat(state.actuallyPaid) : 0.0}￥
              </div>
            </div>
            <Space.Compact style={{ width: "100%" }}>
              <Input placeholder="输入折扣码" onChange={(e) => (state.code = e.target.value)} />
              <Button type="primary" onClick={() => discount(data.order.no, state.code)}>
                使用折扣码
              </Button>
            </Space.Compact>
            <Divider className="title">选择支付方式</Divider>
            <div className="center method">
              <div
                className="methodicon"
                style={{ backgroundImage: `url("${"https://pic.imgdb.cn/item/65a64616871b83018a6e3346.png"}")` }}
              ></div>
              <div style={{ flex: 1, marginLeft: "10px" }}>支付宝 AliPay</div>
              <div>
                <Checkbox
                  checked={state.method === "alipay"}
                  onChange={() => {
                    state.method = "alipay";
                  }}
                />
              </div>
            </div>
            <div className="center method">
              <div
                className="methodicon"
                style={{ backgroundImage: `url("${"https://pic.imgdb.cn/item/65a64c9d871b83018a80a1ba.png"}")` }}
              ></div>
              <div style={{ flex: 1, marginLeft: "10px" }}>微信 WeChat Pay</div>
              <div>
                <Checkbox
                  checked={state.method === "wxpay"}
                  onChange={() => {
                    state.method = "wxpay";
                  }}
                />
              </div>
            </div>
            <div className="center method">
              <div
                className="methodicon"
                style={{ backgroundImage: `url("${"https://pic.imgdb.cn/item/65a64ce0871b83018a816553.png"}")` }}
              ></div>
              <div style={{ flex: 1, marginLeft: "10px" }}>加密货币 USDT</div>
              <div>
                <Checkbox disabled />
              </div>
            </div>
            <div className="center method">
              <div
                className="methodicon"
                style={{ backgroundImage: `url("${"https://pic.imgdb.cn/item/65a64d22871b83018a822201.png"}")` }}
              ></div>
              <div style={{ flex: 1, marginLeft: "10px" }}>信用卡 VISA</div>
              <div>
                <Checkbox disabled />
              </div>
            </div>
            <>
              {!token && (
                <>
                  <Divider className="title">登录或注册</Divider>
                  <div style={{ fontSize: "12px", marginBottom: "5px" }} className="center">
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2332"
                      width="14"
                      height="14"
                    >
                      <path
                        d="M512 958.016611c-245.919634 0-446.016611-200.064292-446.016611-446.016611 0-245.919634 200.095256-446.016611 446.016611-446.016611 245.952318 0 446.016611 200.064292 446.016611 446.016611S757.952318 958.016611 512 958.016611zM512 129.983389c-210.655557 0-382.016611 171.359333-382.016611 382.016611 0 210.624593 171.359333 382.016611 382.016611 382.016611 210.624593 0 382.016611-171.359333 382.016611-382.016611S722.624593 129.983389 512 129.983389z"
                        fill="#ffffff"
                        p-id="2333"
                      ></path>
                      <path
                        d="M463.99957 304.00043c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043-21.490445-48.00043-48.00043-48.00043S463.99957 277.490445 463.99957 304.00043z"
                        fill="#ffffff"
                        p-id="2334"
                      ></path>
                      <path
                        d="M512 768c-17.664722 0-32.00086-14.303454-32.00086-32.00086L479.99914 448c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 287.99914C544.00086 753.696546 529.664722 768 512 768z"
                        fill="#ffffff"
                        p-id="2335"
                      ></path>
                    </svg>
                    未注册用户自动注册
                    <div style={{ flex: 1 }}></div>
                  </div>
                  <Input
                    onChange={(e) => (state.username = e.target.value)}
                    className="authinpout"
                    prefix={<UserOutlined />}
                    showCount
                    placeholder="请输入注册邮箱 或 登录邮箱"
                  />
                  <Input.Password
                    onChange={(e) => (state.password = e.target.value)}
                    className="authinpout"
                    prefix={<UnlockOutlined />}
                    showCount
                    maxLength={14}
                    placeholder="请输入注册密码 或 登录密码"
                  />
                </>
              )}
            </>
            <Button
              loading={state.loading}
              type="primary"
              style={{ width: "100%" }}
              onClick={() => payment(data.order.no)}
            >
              付款
            </Button>
          </div>
        ) : (
          <div className="body">错误</div>
        )
      ) : (
        <div className="body"></div>
      )}
      <Modal
        open={state.wechat.showWechatQr}
        title={<></>}
        onCancel={() => {
          state.wechat.showWechatQr = false;
        }}
        closeIcon={null}
        maskClosable={true}
        footer={[]}
        centered
        width={"auto"}
        destroyOnClose={true}
        modalRender={(modal) => <Qr sub={state.wechat.qr} />}
      />
    </Wrap>
  );
};

export default Order;
