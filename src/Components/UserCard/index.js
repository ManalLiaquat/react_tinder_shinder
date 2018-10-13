import React from "react";
import Cards, { Card } from "react-swipe-card";

let action = msg => {
  console.log(msg);
};

const data = ["Alexandre", "Thomas", "Lucien"];

const Wrapper = () => {
  return (
    <Cards onEnd={action("end")} className="master-root">
      {data.map(item => (
        <Card
          onSwipeLeft={action("swipe left")}
          onSwipeRight={action("swipe right")}
        >
          <h2>{item}</h2>
        </Card>
      ))}
    </Cards>
  );
};

export default Wrapper;
