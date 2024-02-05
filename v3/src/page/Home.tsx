import StatusDesc from "../components/StatusDesc";
import styled from "styled-components";
import PlanItem from "../components/PlanItem";
import { useReactive, useRequest } from "ahooks";
import { getPlansToCount } from "../api/plan.";
import { TypesPlanItem } from "../types/state";
import Feature from "../components/Feature";
import PlanItemLoading from "../components/PlanItemLoading";

const Wrap = styled.div`
  width: 1400px;
  padding-top: 80px;
  margin: 0 auto;
  .body {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
`;

const Switch = styled.div`
  width: 350px;
  background-color: #141414;
  margin: 20px auto;
  border-radius: 50px;
  height: 40px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > div {
    width: 33.3%;
    text-align: center;
    line-height: 30px;
    transition: opacity 0.7s ease;
  }
  > div:hover {
    opacity: 0.6;
  }
`;

type Props = {};

const Home = (props: Props) => {
  const state = useReactive({
    switchType: "cycle",
  });
  const { data, loading } = useRequest(() => getPlansToCount("cycle"), {
    cacheKey: "plans",
  });
  const { data: flowPlans } = useRequest(() => getPlansToCount("flow"), {
    cacheKey: "flowPlans",
  });
  return (
    <Wrap>
      <StatusDesc />
      <Feature />
      <Switch>
        <div
          onClick={() => (state.switchType = "cycle")}
          style={{
            backgroundColor: state.switchType === "cycle" ? "#7ea16a" : "#141414",
            color: state.switchType === "cycle" ? "#000" : "#808080",
            borderRadius: "50px",
            height: "100%",
          }}
        >
          按周期
        </div>
        <div
          onClick={() => (state.switchType = "flow")}
          style={{
            backgroundColor: state.switchType === "flow" ? "#7ea16a" : "#141414",
            color: state.switchType === "flow" ? "#000" : "#808080",
            borderRadius: "50px",
            height: "100%",
          }}
        >
          按流量
        </div>
        <div
          onClick={() => (state.switchType = "zdy")}
          style={{
            backgroundColor: state.switchType === "zdy" ? "#7ea16a" : "#141414",
            color: state.switchType === "zdy" ? "#000" : "#808080",
            borderRadius: "50px",
            height: "100%",
          }}
        >
          自定义
        </div>
      </Switch>
      <div className="body">
        {!loading
          ? state.switchType === "cycle"
            ? data.map((item: TypesPlanItem) => {
                return <PlanItem key={item.pk} data={item} />;
              })
            : flowPlans.map((item: TypesPlanItem) => {
                return <PlanItem key={item.pk} data={item} />;
              })
          : new Array(4).fill("").map((_, index) => {
              return <PlanItemLoading key={index} />;
            })}
      </div>
    </Wrap>
  );
};

export default Home;
