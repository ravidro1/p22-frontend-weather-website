// GlobalFunctions.js
import axios from "axios";

export const fetchWeatherDataByCity = async (
  setLoading,
  setWeatherData,
  setRequestError,
  setInputValue,
  cityName
) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/weather/getWeatherByCity", {
      params: { city: cityName },
    });
    setWeatherData(data.weather); // fixed key from OrganizedData
  } catch (error) {
    if (error?.response?.status === 400) {
      setRequestError("No Suitable City Found");
    } else {
      setRequestError("Server Error");
    }
    setWeatherData(null);
  } finally {
    if (setInputValue) setInputValue("");
    setLoading(false);
  }
};

export const fetchWeatherDataByLatitudeAndLong = async (
  setLoading,
  setWeatherData,
  setRequestError,
  lat,
  lon
) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/weather/getWeatherByLatitudeAndLong", {
      params: { lat, lon },
    });
    setWeatherData(data.weather); // fixed key from OrganizedData
  } catch (error) {
    if (error?.response?.status === 400) {
      setRequestError("No Suitable City Found");
    } else {
      setRequestError("Server Error");
    }
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
};

export const fetchAutoCompleteData = async (
  setAutoCompleteData,
  inputValue
) => {
  try {
    const { data } = await axios.get("/weather/autoComplete", {
      params: { inputValue },
    });
    setAutoCompleteData(data.suggestions);
  } catch (error) {
    if (error?.response?.status === 400) {
      console.error("No Suitable City Found");
    } else {
      console.error("Server Error");
    }
    setAutoCompleteData([]);
  } finally {
  }
};
