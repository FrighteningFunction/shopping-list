import React, { use, useCallback } from "react";

export function WeatherBanner() {
  const [temp, setTemp] = React.useState<number | null>(null);

  const getWeather = useCallback(async () => {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=47.4979&longitude=19.0402&current=temperature_2m",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("Failed to fetch weather data");
      return; // keep the old data until it works again (for now it is fine)
    }
    console.log("Fetched weather data.");
    setTemp(data.current.temperature_2m);
  }, []);

  React.useEffect(() => {
    getWeather();

    const intervalId = setInterval(() => {
      getWeather();
    }, 15 * 60 * 1000); // Update every 10 minutes

    return () => clearInterval(intervalId);
  }, [getWeather]);

  if (temp === null) {
    return null;
  }
  return (
    <div className="alert alert-info text-center mb-4" role="alert">
      <i className="bi bi-cloud-sun" /> It's {temp ?? "loading..."}°C outside!
      Are you ready for some shopping?
    </div>
  );
}
