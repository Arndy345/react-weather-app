import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
import Rainy from "./components/rainy.png";
import Sunny from "./components/sunny.jpg";
import Thunder from "./components/thunder.jpg";

function App() {
  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState({
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const errors = weather.errors;

  const apiKey = "3a19db51d9f3df6187335c17c3984628";
  const getImage = () => {
    if (weather.description) {
      const clouds = ["clouds", "cloudy", "cloud", "overcast"];
      const rainy = ["raining", "rain", "rainy"];
      const sunny = ["sunny", "sun", "shine", "clear", "sky"];
      const thunder = ["thunderstorm", "storm", "thunder"];
      const check = weather.description.split(" ");
      for (let i = 0; i < check.length; i++) {
        if (clouds.includes(check[i])) {
          return (
            <img
              src="https://media.freestocktextures.com/cache/74/8b/748ba3fe5976d8b03219a64851d2790d.jpg"
              alt="cloudy"
              className="img-thumbnail"
            />
          );
        }
        if (rainy.includes(check[i])) {
          return <img src={Rainy} alt="rainy" className="img-thumbnail" />;
        }
        if (sunny.includes(check[i])) {
          return <img src={Sunny} alt="sunny" className="img-thumbnail" />;
        }
        if (thunder.includes(check[i])) {
          return (
            <img src={Thunder} alt="thunder-storm" className="img-thumbnail" />
          );
        }
      }
    }
  };

  async function fetchData(event) {
    event.preventDefault();
    setLoading(true);
    if (input.state && input.country) {
      try {
        const apiData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input.state},${input.country}&APPID=${apiKey}`
        ).then((res) => res.json());

        const state = apiData.name;
        const country = apiData.sys.country;

        setLoading(false);
        if (state && country) {
          setWeather({
            data: apiData,
            city: apiData.name,
            country: apiData.sys.country,
            description: apiData.weather[0].description,
            temperature: Math.round((apiData.main.temp * 9) / 5 - 459.67),
            error: "",
          });
        }
      } catch (error) {
        setLoading(false);
        setWeather({
          errors: "Type a correct city and country",
          data: "",
          city: "",
          country: "",
          description: "",
          temperature: "",
        });
      }
    } else {
      setLoading(false);
      setWeather({
        errors: "Type in both city and country",
        data: "",
        city: "",
        country: "",
        description: "",
        temperature: "",
      });
    }
  }

  useEffect(() => {
    setWeather("");
  }, [input]);

  return (
    <div className="container-fluid App">
      <h2>Weather App By nonsoAndrew</h2>
      <Weather getWeather={fetchData} input={input} setInput={setInput} />
      <div className="d-block justify-content-center align-items-center">
        {loading && <p>Loading...</p>}
        {input.state && weather.country && (
          <p>
            {input.state}, {input.country}
          </p>
        )}
        {weather.temperature && <p>{weather.temperature}°F</p>}
        {weather.description && <p>Conditions: {weather.description}</p>}
        {weather.description && getImage()}
        {errors && <p>{errors}</p>}
      </div>
    </div>
  );
}

export default App;
