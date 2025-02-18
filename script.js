const button = document.getElementById('search-button');
const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const locationButton = document.getElementById('get-location-button');

async function getData(cityName){
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=a6dd89ec3ef843d687f231614251602&q=${cityName}&aqi=yes`
    );
    return await promise.json()
}

button.addEventListener('click', async () => {
    const value = input.value;
    const result = await getData(value);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = `${result.location.localtime}`
    cityTemp.innerText = `${result.current.temp_c}`
});

async function getDataLatLong(lat, lon){
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=a6dd89ec3ef843d687f231614251602&q=${lat},${lon}$&aqi=yes`
    );
    return await promise.json()
}

async function getLocation(position){
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    const result = await getDataLatLong(position.coords.latitude, position.coords.longitude);
    console.log(result);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = `${result.location.localtime}`
    cityTemp.innerText = `${result.current.temp_c}`
}
function failedtoGetLocation(){
    console.log("Failed to get the location");
}

locationButton.addEventListener('click', async () => {
    const result = navigator.geolocation.getCurrentPosition(getLocation, failedtoGetLocation);
});

// http://api.weatherapi.com/v1/current.json?key=a6dd89ec3ef843d687f231614251602&q=London&aqi=yes
