fetch('https://api.openweathermap.org/data/2.5/weather?q=Izmir&units=metric&appid=cb73766baef14a4d2bf9e254babe70c5').then(function (response) {
    return response.json();
    }).then(function (data) {
        weather.innerHTML = `It's currently ${data.main.temp.toFixed()} °C <span style="font-size: .75rem; line-height: 1rem;">(${data.weather[0].description})</span> in
        <strong><a class="izmir" href="https://weather.com/en-GB/weather/today/l/732c4167ec6f3fd504700f6577eb289823a305bbb62a2912e5a2adebc88877e0"
                                target="_blank">Izmir</a></strong>.`
    }).catch(function (err) {
    console.warn('Something went wrong.', err);
});