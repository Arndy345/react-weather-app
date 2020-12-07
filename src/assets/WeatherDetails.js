import React from "react";
import Icon from "./Icon";

function WeatherDetails({ degree, desc }) {
  const today = function getCurrentDate(separator = "") {
    let newDate = new Date();
    let today = newDate.toUTCString();
    // let date = newDate.getDate();
    // let month = newDate.getMonth() + 1;
    // let year = newDate.getFullYear();

    return today;
    //   month < 10 ? `0${month}` : `${month}`
    // }${separator}${date}`;
  };
  return (
    <div>
      <Icon img={desc} />
      <div>
        <div className="temp">
          {Math.round(degree)}
          <span className="temp__symbol">°F</span>
        </div>
        <div className="desc">{desc}</div>
        <div className="DateWrapper">{today("--")}</div>
      </div>
    </div>
  );
}

export default WeatherDetails;
