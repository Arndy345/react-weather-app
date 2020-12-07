import React from "react";

function Error({ child }) {
  return (
    <div className="d-flex justify-content-center">
      <h1 className="m-3 align-items-center d-flex error">404</h1>

      <div>
        <h3>Oops!</h3>
        <p className="">{child}</p>
        <a href="/">
          <button className="btn btn-success">Try again</button>
        </a>
      </div>
    </div>
  );
}

export default Error;
