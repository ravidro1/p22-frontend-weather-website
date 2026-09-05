# Weather Website — Frontend

A responsive **React** single-page application that lets users search for a city and instantly see its current weather conditions. It talks to a companion Node.js/Express backend, which proxies requests to the WeatherAPI service.

## What the project does

- **Search by city name** — type a city into the input field to fetch its current weather (temperature, precipitation, humidity, wind speed, and country)
- **Live autocomplete** — as the user types, the app debounces the input and requests matching city suggestions, displayed as a clickable dropdown list
- **"Find my location"** — uses the browser's Geolocation API to get the user's coordinates and fetch weather for their current location, with graceful error handling if location access is denied or unsupported
- **Weather card** — results are displayed in a card component with a smooth scroll-into-view animation and a refresh button to re-fetch the latest data for the same city
- **Error handling & loading states** — invalid/empty searches, server errors, and loading states (blurred card while refreshing) are all handled with user-facing feedback

## Tech stack

- **React 18** — component-based UI, using Hooks (`useState`, `useRef`, `useEffect`) for state and lifecycle management
- **Vite** — fast dev server and build tool
- **Axios** — HTTP client for communicating with the backend API, with a base URL configured from an environment variable
- **Browser Geolocation API** — for the "find my location" feature
- **Plain CSS** (per-component stylesheets) — for layout and styling, no CSS framework
- **ESLint** — configured with React-specific rules (`eslint-plugin-react`, `eslint-plugin-react-hooks`) for code quality

## Project structure

```
├── src/
│   ├── components/
│   │   ├── Input.jsx       # City input field, autocomplete dropdown, "find my location" button
│   │   └── Card.jsx        # Weather result card
│   ├── GlobalFunctions.js  # Shared API-calling functions (Axios requests to the backend)
│   ├── App.jsx             # Root component wiring input and card together
│   ├── main.jsx            # App entry point, sets Axios base URL from env
│   └── style/              # CSS files
├── public/                 # Static assets (icons)
├── index.html
└── vite.config.js
```

## How it connects to the backend

All API calls go through `GlobalFunctions.js` to these backend endpoints (relative to `VITE_BACKEND_URL`):

- `GET /weather/getWeatherByCity?city=...`
- `GET /weather/getWeatherByLatitudeAndLong?lat=...&lon=...`
- `GET /weather/autoComplete?inputValue=...`

## Getting started

1. Clone the repository
2. Create a `.env` file in the project root and point it to your running backend:
   ```
   VITE_BACKEND_URL="http://localhost:8000"
   ```
3. Install dependencies:
   ```
   npm i
   ```
4. Start the dev server:
   ```
   npm start
   ```

Make sure the backend server is running first, since this app depends on it for all weather data.
