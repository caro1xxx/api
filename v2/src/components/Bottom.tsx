import React from "react";

type Props = {};

const Bottom = (props: Props) => {
  return (
    <div
      style={{
        color: "#838383",
        textAlign: "center",
        paddingBottom: "20px",
        fontSize: "15px",
        userSelect: "none",
        marginTop: "50px",
      }}
    >
      <div>有任何问题请联系Mail: support@zoomm.cloud</div>
      &copy; 2024 Zoommm. All rights reserved. 香港九龍尖沙咀漆咸道南87-105號百利商業中心5樓
    </div>
  );
};

export default Bottom;
