//Form
const cityInput = document.getElementById('cityInput')
const unitValue = document.querySelectorAll('input[name="unit"]')
let unit = "metric"
let symbol = "°C"
let velocSymbol = "m/s"


//Display
const app = document.getElementById('display')
const cityName = document.getElementById('cityName')
const weatherIcon = document.getElementById('weatherIcon')
const weatherDesc = document.getElementById('weatherDesc')
const weatherTemp = document.getElementById('weatherTemp')
const windDesc = document.getElementById('windDesc')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const windIcon = document.getElementById('windIcon')
const humidityIcon = document.getElementById('humidityIcon')
const h4 = document.querySelector('#title')

const getWeather = event => {
    event.preventDefault()
    if (unitValue[0].checked) {
        unit = "metric"
        symbol = "°C"
        velocSymbol = "m/s"
    } else {
        unit = "imperial"
        symbol = "°F"
        velocSymbol = "mph"
    }
    console.log(cityInput.value, unit)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value.toLowerCase()}&APPID=bd8cfe32865d2f6286924722b05aaf80&units=${unit}`)
        .then(res => res.json())
        .then(response => renderWeatherApp(response))
        .catch(err => {
            console.log(err)
            renderErrorPage()
        })
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
}

const renderWeatherApp = data => {
    const { name, main, weather, wind } = data
    const country = data.sys.country
    console.log(name, main, weather, wind, country);
    cityName.textContent = `${name}, ${country}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`
    weatherDesc.textContent = `${capitalize(weather[0].description)}`
    weatherTemp.textContent = `${Math.round(main["temp"])}${symbol}`
    windDesc.innerText = `Winds: ${wind["speed"]} ${velocSymbol}`
    humidity.innerText = `Humidity: ${main["humidity"]} %`
    pressure.innerText = `Pressure: ${main["pressure"]} hPa`
}


function renderErrorPage() {
    cityName.textContent = "Unfortunately there's been an error in your request"
    weatherIcon.src = ""
    weatherDesc.textContent = ""
    weatherTemp.textContent = ""
    windDesc.textContent = ""
    humidity.textContent = ""
    pressure.textContent = ""
    app.setAttribute = ("display", "none")
}


function success(pos) {
    window.onload = crd => {
        console.log(crd);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&APPID=bd8cfe32865d2f6286924722b05aaf80&units=${unit}`)
        .then(res => res.json())
        .then(response => renderWeatherApp(response))
        .catch(err => {
            console.log(err)
            renderErrorPage()
        })
    }
}

navigator.geolocation.getCurrentPosition(success)
//https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=bd8cfe32865d2f6286924722b05aaf80&units=${unit}