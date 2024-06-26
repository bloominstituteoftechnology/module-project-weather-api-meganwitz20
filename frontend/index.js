async function moduleProject4() {
  // 👇 WORK WORK BELOW THIS LINE 👇
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

  // 👉 Tasks 1 - 5 go here
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

    document.querySelector('#weatherWidget').style.display = 'block';
    document.querySelector('.info').textContent = '';
    EventTarget.target.removeAttribute('disabled');
    console.log(res.data);
  } catch (err) { 
      console.log('promise rejected with an err.message ==>', err.message);
    }
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
