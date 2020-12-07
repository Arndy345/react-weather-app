import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
import Error from "./assets/Error";
import Preview from "./assets/Preview";
import Loader from "./components/Loading";
import Card from "./Card";
import Header from "./Header";
import assetMapping from "./assets/assetMapping.json";
import WeatherDetails from "./assets/WeatherDetails";

function App() {
  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState({
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const apiKey = "3a19db51d9f3df6187335c17c3984628";

  async function fetchData(event) {
    event.preventDefault();
    setLoading(true);
    if (input.state) {
      try {
        const apiData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input.state}&APPID=${apiKey}`
        ).then((res) => res.json());

        const state = apiData.name;

        setLoading(false);
        if (state) {
          setWeather({
            data: apiData,
            city: apiData.name,
            country: apiData.sys.country,
            description: apiData.weather[0].main,
            temperature: Math.round((apiData.main.temp * 9) / 5 - 459.67),
            error: "",
          });
        } else {
          setLoading(false);
          setWeather({
            errors: "We can't the city you are looking for",
            data: "",
            city: "",
            country: "",
            description: "",
            temperature: "",
          });
          console.log(weather.errors);
        }
      } catch (error) {
        setLoading(false);
        setWeather({
          errors: "Check your internet connection",
          data: "",
          city: "",
          country: "",
          description: "",
          temperature: "",
        });
        console.log(weather.errors);
      }
    }
  }

  useEffect(() => {
    setWeather("");
  }, [input]);

  let cardContent = <Preview />;
  if (loading) {
    cardContent = <Loader />;
  } else if (weather.errors) {
    cardContent = <Error child={weather.errors} />;
  } else if (weather.temperature && weather.description) {
    cardContent = (
      <WeatherDetails degree={weather.temperature} desc={weather.description} />
    );
  }

  return (
    <div className="container-fluid App">
      <Header
        color={
          assetMapping.colors[weather.errors ? "error" : weather.description]
        }
      />

      <Weather getWeather={fetchData} input={input} setInput={setInput} />
      <div className="d-block justify-content-center align-items-center card">
        <Card>{cardContent}</Card>
      </div>
    </div>
  );
}

export default App;
