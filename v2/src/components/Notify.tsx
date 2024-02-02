import styled from "styled-components";
import { timeAgo } from "../utils/tools";

const Wrap = styled.div`
  position: fixed;
  bottom: 20px;
  z-index: 2;
  right: 20px;
  background-color: #fffeff;
  border: 1px solid #cececed3;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(119, 119, 119, 0.2), 0 6px 20px 0 rgba(84, 84, 84, 0.19);
  color: #5a5c5eb9;
  font-size: 12px;
  width: 300px;
  .logo {
    margin-right: 5px;
  }
  .update {
    font-size: 10px;
    font-family: Helvetica;
  }
  .close {
    cursor: pointer;
    margin-left: 10px;
  }
  .close:hover {
    opacity: 0.5;
  }
  .content {
    border-top: 1px solid #cececed3;
    padding: 10px 10px;
    color: #2c2c2c;
    > span {
      color: #6389f0;
    }
    > a {
      color: #6389f0;
    }
  }
`;

type Props = {
  close: () => void;
  content: {
    content: string;
    updateTime: number;
  };
};

const Notify = (props: Props) => {
  return (
    <Wrap>
      <div className="center" style={{ padding: "5px 10px" }}>
        <svg
          className="logo"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3341"
          width="20"
          height="20"
        >
          <path
            d="M752.768 955.392H257.92c-112.384 0-203.392-91.008-203.392-203.392V257.152C54.528 144.768 145.536 53.76 257.92 53.76h494.848C865.152 53.76 956.16 144.768 956.16 257.152v494.848c0 112.384-91.008 203.392-203.392 203.392z"
            fill="#2c2c2c"
            p-id="3342"
          ></path>
          <path
            d="M616.576 765.952H370.56c-67.968 0-123.008-55.04-123.008-123.008V396.8c0-67.968 55.04-123.008 123.008-123.008h166.272c9.984 0 18.176 8.064 18.176 18.176 0 9.984-8.064 18.176-18.176 18.176H370.56c-47.872 0-86.656 38.784-86.656 86.656v246.016c0 47.872 38.784 86.656 86.656 86.656h246.016c47.872 0 86.656-38.784 86.656-86.656V469.12c0-9.984 8.064-18.176 18.176-18.176 9.984 0 18.176 8.064 18.176 18.176v173.824c0 67.968-55.04 123.008-123.008 123.008z"
            fill="#fff"
            p-id="3343"
          ></path>
          <path
            d="M694.784 312.704m-113.408 0a113.408 113.408 0 1 0 226.816 0 113.408 113.408 0 1 0-226.816 0Z"
            fill="#fff"
            p-id="3344"
          ></path>
        </svg>
        <div style={{ cursor: "default" }}>官方公告</div>
        <div style={{ flex: 1 }}></div>
        <span style={{ cursor: "default" }} className="update">
          {timeAgo(props.content.updateTime * 1000)}
        </span>
        <svg
          onClick={props.close}
          className="close"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4955"
          width="15"
          height="15"
        >
          <path
            d="M557.2 512l233.4-233.4c12.5-12.5 12.5-32.8 0-45.2s-32.8-12.5-45.2 0L512 466.8 278.6 233.4c-12.5-12.5-32.8-12.5-45.2 0s-12.5 32.8 0 45.2L466.8 512 233.4 745.4c-12.5 12.5-12.5 32.8 0 45.2 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.2l233.4 233.4c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.2L557.2 512z"
            p-id="4956"
            fill="#a9a9ab"
          ></path>
        </svg>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: props.content.content }}></div>
    </Wrap>
  );
};

export default Notify;
