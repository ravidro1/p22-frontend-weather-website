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

  const clickTheCheckButton = () => {
    if (!cityInputValue) {
      setRequestError("You must enter a city before clicking the button");
      return;
    }
    fetchWeatherData(
      setLoading,
      setWeatherData,
      setRequestError,
      setCityInputValue,
      cityInputValue
    );
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
        <button onClick={clickTheCheckButton}>Check</button>
      </form>
      <p className="requestError"> {requestError && requestError} </p>
    </div>
  );
}
