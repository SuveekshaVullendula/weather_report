document
  .getElementById("weatherForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "a76bc8df06a9af495fc535a3df34ef80"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherResult = document.getElementById("weatherResult");
    const errorMessage = document.getElementById("errorMessage");

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("City not found or API error.");
      }

      const data = await response.json();

      // Extract weather details
      const temp = (data.main.temp - 273.15).toFixed(2); // Kelvin to Celsius
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const dateTime = new Date().toLocaleString(); // ✅ timestamp

      // Display weather information
      document.getElementById("cityName").textContent = city.toUpperCase();
      document.getElementById("dateTime").textContent = dateTime; // ✅ show timestamp
      document.getElementById("temperature").textContent = temp;
      document.getElementById("weatherDesc").textContent = desc;
      document.getElementById("humidity").textContent = humidity;
      document.getElementById("windSpeed").textContent = windSpeed;

      weatherResult.classList.remove("hidden");
      errorMessage.classList.add("hidden");
    } catch (error) {
      // Handle errors
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
      weatherResult.classList.add("hidden");
    }
  });
