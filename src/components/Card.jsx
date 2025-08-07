import React, { useEffect, useRef } from "react";
import { fetchWeatherDataByCity } from "../GlobalFunctions";

export default function Card({
  loading,
  setLoading,
  weatherData,
  setWeatherData,
  setRequestError,
}) {
  const { city, country, degree, precipitation, humidity, wind } = weatherData;
  const cardRef = useRef();

  useEffect(() => {
    cardRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [weatherData]);

  return (
    <div
      style={{ filter: loading ? "blur(4px)" : "" }}
      ref={cardRef}
      className="card"
    >
      <header className="card-header">
        <button
          onClick={() =>
            fetchWeatherDataByCity(
              setLoading,
              setWeatherData,
              setRequestError,
              null,
              city
            )
          }
        >
          <img src="/refresh-icon.svg" alt="refresh-icon" />
        </button>
        <h1 className="card-city">{city}</h1>
      </header>
      <h3 className="card-country">{country}</h3>
      <p className="card-degree">
        {degree}
        <sup>&deg;</sup>
      </p>
      <div className="card-data">
        <div className="card-data-detailed">
          <p>Precipitation</p>
          <h3>{precipitation} mm</h3>
        </div>
        <div className="card-data-detailed">
          <p>Humidity</p>
          <h3>{humidity}%</h3>
        </div>
        <div className="card-data-detailed">
          <p>Wind</p>
          <h3>{wind} km/h</h3>
        </div>
      </div>
    </div>
  );
}
