import React from "react";

function Icon({ img }) {
  const icon = `../components/${img}.svg`;
  return (
    <img
      src={require(`../components/${img}.svg`).default}
      alt={img}
      className="icon"
    />
  );
}

export default Icon;
