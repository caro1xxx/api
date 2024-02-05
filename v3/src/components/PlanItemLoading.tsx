import { Skeleton } from "antd";

type Props = {};

const PlanItemLoading = (props: Props) => {
  return (
    <Skeleton.Button
      style={{ height: "532px", width: "100%" }}
      active={true}
      size={"default"}
      shape={"square"}
      block={true}
    />
  );
};

export default PlanItemLoading;
