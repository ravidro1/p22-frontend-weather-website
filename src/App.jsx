import { useState } from "react";
import Input from "./components/Input";
import Card from "./components/Card";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(null);

  return (
    <main className="app">
      <section className="leftAndUp-section">
        <h1>Use our weather app to see the weather around the world</h1>
        <Input
          setLoading={setLoading}
          setWeatherData={setWeatherData}
          requestError={requestError}
          setRequestError={setRequestError}
        />
      </section>
      {weatherData && typeof weatherData == "object" && (
        <section className="rightAndDown-section">
          <Card
            loading={loading}
            setLoading={setLoading}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            setRequestError={setRequestError}
          />
        </section>
      )}
    </main>
  );
}

export default App;
