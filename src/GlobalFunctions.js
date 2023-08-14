import axios from "axios";

export const fetchWeatherData = async (
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
    setWeatherData(data.OrganizedData);
  } catch (error) {
    if (error?.response?.status == 400) {
      setRequestError("No Suitable City Found");
    } else {
      setRequestError("Server Error");
    }
    setWeatherData(null);
  } finally {
    if (setInputValue != null) setInputValue("");
    setLoading(false);
  }
};
