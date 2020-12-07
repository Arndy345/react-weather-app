import React from "react";

function Header({ color }) {
  return (
    <div className="Header" style={{ backgroundColor: color }}>
      <header>My Weather</header>
    </div>
  );
}

export default Header;
