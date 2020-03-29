import React, { useState, useEffect } from "react";
import "./styles.scss";
import Axios from "axios";

const apiUrl = {
  key: "d36e6b6e1d33a02133b105abcc839ed3",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [temp,setTemp]=useState({})
  
  useEffect(() => {
    Axios.get(`${apiUrl.base}weather?q=London&APPID=${apiUrl.key}`).then(
      ({ data }) => {
        setWeather(data);
        setTemp(data.main.temp-273,15)
      }
    );
      
  }, []);

  let search = e => {
    if (e.key === "Enter") {
      Axios(`${apiUrl.base}weather?q=${query}&APPID=${apiUrl.key}`).then(
        ({ data }) => {
          setWeather(data);
          setQuery("");
          setTemp(data.main.temp-273,15)
        }
      );
    }
  };

  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="app">
      <div className={(typeof weather.main != 'undefined')?((temp > 16)? 'main warm':'main'):'main'}>
        <div className="linear">
          {/* input */}
          <div className="form-group container">
            <br />
            <input
              type="text"
              className="form-control mx-auto"
              placeholder="serch your country here..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {/* content */}
          {typeof weather.main != "undefined" ? (
            <div className="content text-center pt-3">
              <h1 className="font-weight-bold mt-5">{weather.weather[0].main}</h1>
              <h5 className="font-weight-bold">
                {weather.name} , {weather.sys.country}
              </h5>
              <h5>{dateBuilder(new Date())}</h5>
              <h1 className="display-1 mx-auto font-weight-bold mt-4">
                {Math.round(temp)}&deg;c
              </h1>
            </div>
          ) : ('')}
        </div>
      </div>
    </div>
  );
}

export default App;
