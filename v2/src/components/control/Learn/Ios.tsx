import { useReactive } from "ahooks";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrap = styled.div``;

type Props = {};

const Ios = (props: Props) => {
  const data = useReactive({
    list: [
      { img: "https://pic.imgdb.cn/item/65b64a50871b83018a64d07e.png", title: "选择任意订阅进行付款", value: "" },
      {
        img: "https://pic.imgdb.cn/item/65b64bc2871b83018a6bb3f9.jpg",
        title: "退出手机上的Appstore(应用商店)账号",
        value: "",
      },
      {
        img: "https://pic.imgdb.cn/item/65b64d49871b83018a72f08b.png",
        title: "登录ZOOM Cloud官方的账号(下载Shadowrocket小火箭软件)",
        value: "进TG群联系管理员获取免费Appstore账号(12:00-24:00)在线",
      },
      {
        img: "https://pic.imgdb.cn/item/65b64e28871b83018a77067c.png",
        title: "进TG群联系管理员获取验证码(12:00-24:00)在线",
        value: "https://t.me/+m6oaW9EOMKYzMDI1",
      },
      {
        img: "https://pic.imgdb.cn/item/65b653ae871b83018a94aa87.png",
        title: "成功登录账号后 选择已够项目",
        value: "",
      },
      {
        img: "https://pic.imgdb.cn/item/65b6540c871b83018a96dea0.png",
        title: "下载shadowrocket软件",
        value: "",
      },
      {
        img: "https://pic.imgdb.cn/item/65b6545f871b83018a98f84d.png",
        title: "回到ZOOM Cloud网站 选择我的订阅",
        value: "",
      },
      {
        img: "https://pic.imgdb.cn/item/65b654a7871b83018a9a95fd.jpg",
        title: "查看ShadowRocket订阅",
        value: "",
      },
    ],
  });
  return (
    <Wrap>
      {data.list.map((item, index: number) => {
        return (
          <div key={item.img} style={{ marginBottom: "10px" }}>
            <div style={{ marginBottom: "5px" }}>
              步骤{index + 1}:{item.title}
              <Link target="_blank" to={item.value}>
                {item.value}
              </Link>
            </div>
            <img src={item.img} alt={index + ""} height={500} width={300} />
          </div>
        );
      })}
    </Wrap>
  );
};

export default Ios;
