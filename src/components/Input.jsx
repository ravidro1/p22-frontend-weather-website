import { useRef, useState } from "react";
import {
  fetchWeatherDataByCity,
  fetchWeatherDataByLatitudeAndLong,
  fetchAutoCompleteData,
} from "../GlobalFunctions";

export default function Input({
  setLoading,
  setWeatherData,
  requestError,
  setRequestError,
}) {
  const [cityInputValue, setCityInputValue] = useState("");
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const delaySearchRef = useRef();

  const changeInputValue = (event) => {
    const value = event.target.value;
    setCityInputValue(value);
    setRequestError(null);
    setShowSuggestions(true);

    if (delaySearchRef.current) {
      clearTimeout(delaySearchRef.current);
    }

    delaySearchRef.current = setTimeout(() => {
      autoComplete(value);
    }, 400);
  };

  const clickTheCheckButton = () => {
    if (!cityInputValue) {
      setRequestError("You must enter a city before clicking the button");
      return;
    }
    setShowSuggestions(false);
    fetchWeatherDataByCity(
      setLoading,
      setWeatherData,
      setRequestError,
      setCityInputValue,
      cityInputValue
    );
  };

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      setRequestError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setShowSuggestions(false);
        fetchWeatherDataByLatitudeAndLong(
          setLoading,
          setWeatherData,
          setRequestError,
          latitude,
          longitude
        );
      },
      (error) => {
        setRequestError(
          `Error getting your location: ${error.message}. Try allowing location access in your browser settings and retry again.`
        );
      }
    );
  };

  const autoComplete = async (inputValue) => {
    if (!inputValue) {
      setAutoCompleteResults([]);
      return;
    }

    try {
      await fetchAutoCompleteData(setAutoCompleteResults, inputValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (city) => {
    setCityInputValue(city);
    setAutoCompleteResults([]);
    setShowSuggestions(false);
    setRequestError(null);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor="input-field" className="input-label">
        Enter a city name
      </label>

      <form onSubmit={(e) => e.preventDefault()} className="form-group">
        <div className="autocomplete-container">
          <input
            id="input-field"
            value={cityInputValue}
            onChange={changeInputValue}
            type="text"
            placeholder="e.g., London"
            className="input-field"
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay to allow click
          />
          {showSuggestions && autoCompleteResults.length > 0 && (
            <ul className="autocomplete-list">
              {autoCompleteResults.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="autocomplete-item"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={clickTheCheckButton}
          className="button primary"
        >
          Check
        </button>
      </form>

      {requestError && <p className="error-message">{requestError}</p>}

      <button onClick={findMyLocation} className="button secondary">
        Find my location
      </button>
    </div>
  );
}
