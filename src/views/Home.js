import React from "react";
import { useSelector } from "react-redux";
import Bikes from "../components/Bikes";
//action
function Home() {
  const bikes = useSelector(state => state.bikes);
  // useEffect(() => {
  //   dispatch(fetchBikes());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <Bikes bikes={bikes} />
    </div>
  );
}

export default Home;
