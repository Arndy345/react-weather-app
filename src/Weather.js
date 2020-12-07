import React from "react";
import "./App.css";

function Weather({ getWeather, input, setInput }) {
  const handleChange = (event) => {
    const value = event.target.value;
    setInput({ ...input, [event.target.name]: value });
  };

  return (
    <div className="form-group p-4 d-flex justify-content-center input-group-sm">
      <input
        type="text"
        placeholder="Enter City"
        value={input.state}
        name="state"
        onChange={(event) => handleChange(event)}
        className="form-control ml-2"
      />
      <input
        type="text"
        placeholder="Enter Country"
        value={input.country}
        name="country"
        onChange={handleChange}
        className="form-control ml-2"
      />
      <div>
        <button
          type="submit"
          className="btn btn-success ml-2"
          onClick={getWeather}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Weather;
