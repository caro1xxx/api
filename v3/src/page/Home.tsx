import StatusDesc from "../components/StatusDesc";
import styled from "styled-components";
import PlanItem from "../components/PlanItem";
import { useRequest } from "ahooks";
import { getPlansToCount } from "../api/plan.";
import { TypesPlanItem } from "../types/state";

const Wrap = styled.div`
  width: 1400px;
  padding-top: 80px;
  margin: 0 auto;
  .body {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
`;

type Props = {};

const Home = (props: Props) => {
  const { data, loading } = useRequest(() => getPlansToCount(7, "cycle"), {
    cacheKey: "plans",
  });
  return (
    <Wrap>
      <StatusDesc />
      <div className="body">
        {!loading
          ? data.map((item: TypesPlanItem) => {
              return <PlanItem key={item.pk} data={item} />;
            })
          : null}
      </div>
    </Wrap>
  );
};

export default Home;
