import styled from "styled-components";
import { getAllPlans } from "../api/plan";
import { useRequest } from "ahooks";
import { TypesPlanItem } from "../types/state";
import PlanItem from "../components/PlanItem";
import Bottom from "../components/Bottom";

const Wrap = styled.div`
  background-image: url("https://pic.imgdb.cn/item/65a63bd2871b83018a518bfe.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: calc(100vh);
  overflow-y: scroll;
  .plansWrap {
    width: 1200px;
    margin: 50px auto;
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    @media screen and (max-width: 1190px) {
      grid-template-columns: repeat(2, 1fr);
      width: calc(100vw);
      padding: 0px 10px;
      grid-row-gap: 20px;
    }
    @media screen and (max-width: 550px) {
      grid-template-columns: repeat(1, 1fr);
      width: calc(100vw);
      padding: 0px 10px;
      grid-row-gap: 20px;
    }
  }
`;

type Props = {};

const Plans = (props: Props) => {
  const { data, loading } = useRequest(getAllPlans, {
    cacheKey: "plans",
  });
  return (
    <Wrap>
      <div className="plansWrap">
        {!loading &&
          data.map((item: TypesPlanItem) => {
            return <PlanItem key={item.pk} data={item} />;
          })}
      </div>
      <Bottom />
    </Wrap>
  );
};

export default Plans;
