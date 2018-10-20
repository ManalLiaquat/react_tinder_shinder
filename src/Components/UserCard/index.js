import React from "react";
import Cards, { Card } from "react-swipe-deck";
import { Card as MUICard } from "@material-ui/core"
import img1 from "../../Images/img1.jpg";
import img2 from "../../Images/img2.jpg";
import img3 from "../../Images/img3.jpg";


let action = msg => {
  console.log(msg);
};

const data = ["Alexandre", "Thomas", "Lucien"];
const images = [img1, img2, img3];

const Wrapper = () => {
  return (

    <Cards onEnd={action("end")} className="master-root">
      {data.map(item => (
        <Card
          onSwipeLeft={() => { action("swipe left") }}
          onSwipeRight={() => { action("swipe right") }}
        >
          <MUICard>
            <Cards onEnd={action("end")} className="master-root">
              {
                images.map(path => (
                  <Card
                    onSwipeLeft={() => { action("swipe left") }}
                    onSwipeRight={() => { action("swipe right") }}>
                    <img src={path} width="100%" height="100px" alt="user" />
                  </Card>
                ))
              }
            </Cards>
            <h2>{item}</h2>
          </MUICard>
        </Card>
      ))}
    </Cards>
  );
};

export default Wrapper;
