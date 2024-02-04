import { QRCode } from "antd";
import styled from "styled-components";

const Wrap = styled.div`
  background-color: #161616;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  pointer-events: auto;
  overflow: hidden;
  padding: 20px;
`;

type Props = {
  sub: string;
};

const Qr = (props: Props) => {
  return (
    <Wrap>
      <QRCode size={300} errorLevel="H" value={props.sub} />
    </Wrap>
  );
};

export default Qr;
