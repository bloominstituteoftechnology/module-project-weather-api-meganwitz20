async function moduleProject4() {
  // :point_down: WORK BELOW THIS LINE :point_down:
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ];

  // :point_right: Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display = 'none';
  const citySelect = document.querySelector('#citySelect');
  citySelect.addEventListener('change', async function(event) {
    console.log('selection changed');
    try {
      citySelect.setAttribute('disabled', 'disabled');
      document.querySelector('#weatherWidget').style.display = 'none';
      document.querySelector('.info').textContent = 'Fetching weather data...';
      console.log(event.target.value);
      let city = event.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;

      const res = await axios.get(url);

      document.querySelector('#weatherWidget').style.display = '';
      document.querySelector('.info').textContent = '';
      citySelect.removeAttribute('disabled');

      let data = res.data;

      // Update location
      document.querySelector('#location div:first-child').textContent = data.location.city;
      document.querySelector('#location div:last-child').textContent = data.location.country;

      // Update current weather
      document.querySelector('#apparentTemp div:nth-child(2)').textContent = `${data.current.apparent_temperature}°`;
      document.querySelector('#todayDescription').textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector('#todayStats div:nth-child(1)').textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      document.querySelector('#todayStats div:nth-child(2)').textContent = `Precipitation: ${(data.current.precipitation_probability * 100).toFixed(0)}%`;
      document.querySelector('#todayStats div:nth-child(3)').textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector('#todayStats div:nth-child(4)').textContent = `Wind: ${data.current.wind_speed}m/s`;

      // Update forecast
      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx];

        let weekday = card.children[0];
        let apparent = card.children[1];
        let minMax = card.children[2];
        let precipit = card.children[3];

        weekday.textContent = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`;
        precipit.textContent = `Precipitation: ${(day.precipitation_probability * 100).toFixed(0)}%`;
      });
    } catch (err) {
      console.log('promise rejected with an err.message ==>', err.message);
    }
  });

  // :point_up_2: WORK ABOVE THIS LINE :point_up_2:
}

// :exclamation: DO NOT CHANGE THE CODE  BELOW
// :exclamation: DO NOT CHANGE THE CODE  BELOW
// :exclamation: DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
