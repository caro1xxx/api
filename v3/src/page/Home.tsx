import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPlansToCount } from "../api/plan.";
import { useRequest } from "ahooks";

const Wrap = styled.div`
  padding-top: 20px;
  color: white;
`;

type Props = {};

const Home = (props: Props) => {
  const { data, loading } = useRequest(() => getPlansToCount(10, "cycle"), { cacheKey: "plans" });
  return (
    <Wrap>
      <Swiper spaceBetween={10} slidesPerView={6}>
        {/* <SwiperSlide ></SwiperSlide> */}
      </Swiper>
    </Wrap>
  );
};

export default Home;
