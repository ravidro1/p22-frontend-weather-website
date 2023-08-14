import React, { useState } from "react";
import { fetchWeatherData } from "../GlobalFunctions";

export default function Input({
  setLoading,
  setWeatherData,
  requestError,
  setRequestError,
}) {
  const [cityInputValue, setCityInputValue] = useState("");

  const changeInputValue = (event) => {
    setCityInputValue(event.target.value);
    setRequestError(null);
  };

  return (
    <div>
      <label className="input-label" htmlFor="input-field">
        City name
      </label>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="input-container"
      >
        <input
          id="input-field"
          value={cityInputValue}
          onChange={changeInputValue}
          type="text"
        />
        <button
          onClick={() =>
            fetchWeatherData(
              setLoading,
              setWeatherData,
              setRequestError,
              setCityInputValue,
              cityInputValue
            )
          }
        >
          Check
        </button>
      </form>
      <p className="requestError"> {requestError && requestError} </p>
    </div>
  );
}
